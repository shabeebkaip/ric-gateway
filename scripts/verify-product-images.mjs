import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

import { normalizeProductImages } from '../src/lib/productImageNormalization.ts';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, '..');
const productsPath = resolve(projectRoot, 'src/lib/products.ts');
const nextConfigPath = resolve(projectRoot, 'next.config.ts');
const loadPackage = createRequire(import.meta.url);
const ts = loadPackage('typescript');

const loadStaticCatalog = () => {
  const source = readFileSync(productsPath, 'utf8');
  const exportStatement =
    'export const products = productCatalog.map(normalizeProductImages);';
  const instrumentedSource = source.replace(
    exportStatement,
    `export { productCatalog };\n${exportStatement}`
  );

  assert.notEqual(
    instrumentedSource,
    source,
    'Static catalog export could not be instrumented for verification'
  );

  const { outputText } = ts.transpileModule(instrumentedSource, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: productsPath,
  });
  const catalogModule = { exports: {} };

  vm.runInNewContext(
    outputText,
    {
      module: catalogModule,
      exports: catalogModule.exports,
      require(specifier) {
        if (specifier === './productImageNormalization') {
          return { normalizeProductImages };
        }

        throw new Error(`Unexpected static catalog dependency: ${specifier}`);
      },
    },
    { filename: productsPath }
  );

  return {
    products: catalogModule.exports.products,
    rawProducts: catalogModule.exports.productCatalog,
  };
};

const imageListsFor = (product) => {
  const lists = [];

  if (Array.isArray(product.images)) {
    lists.push(product.images);
  }

  if (Array.isArray(product.variants)) {
    for (const variant of product.variants) {
      if (
        variant &&
        typeof variant === 'object' &&
        !Array.isArray(variant) &&
        Array.isArray(variant.images)
      ) {
        lists.push(variant.images);
      }
    }
  }

  return lists;
};

const verifyDbShapedFixture = () => {
  const cleanUrl = 'https://example.com/clean.jpg';
  const nonStringImage = { assetId: 7 };
  const nonArrayVariant = { code: 'unchanged', images: 'not-an-array' };
  const unrelated = { nested: true };
  const doc = {
    slug: 'db-product',
    images: ['https://example.com/base.jpg'],
    additionalInfo: {
      images: ['\t https://example.com/override.jpg \n', cleanUrl, nonStringImage],
      variants: [
        {
          code: 'A',
          images: [
            '  https://example.com/variant-a.jpg',
            'https://example.com/variant-b.jpg  ',
          ],
        },
        'string-variant',
        null,
        42,
        nonArrayVariant,
      ],
      unrelated,
    },
  };
  const effectiveProduct = {
    id: doc.slug,
    images: doc.images,
    ...(doc.additionalInfo ?? {}),
  };
  const originalSnapshot = structuredClone(effectiveProduct);
  const result = normalizeProductImages(effectiveProduct);

  assert.deepEqual(result.images, [
    'https://example.com/override.jpg',
    cleanUrl,
    nonStringImage,
  ]);
  assert.deepEqual(result.variants[0].images, [
    'https://example.com/variant-a.jpg',
    'https://example.com/variant-b.jpg',
  ]);
  assert.equal(result.images[1], cleanUrl, 'Clean image URL changed');
  assert.equal(result.images[2], nonStringImage, 'Non-string image value changed');
  assert.equal(result.variants[1], 'string-variant');
  assert.equal(result.variants[2], null);
  assert.equal(result.variants[3], 42);
  assert.equal(result.variants[4], nonArrayVariant);
  assert.equal(result.unrelated, unrelated, 'Unrelated product field changed');
  assert.equal(result.images.length, effectiveProduct.images.length);
  assert.equal(result.variants.length, effectiveProduct.variants.length);
  assert.deepEqual(effectiveProduct, originalSnapshot, 'Normalizer mutated its input');
};

const verifyStaticCatalog = (rawProducts, products) => {
  assert.equal(products.length, rawProducts.length, 'Static product cardinality changed');

  let imageValueCount = 0;
  for (const product of rawProducts) {
    for (const images of imageListsFor(product)) {
      for (const image of images) {
        imageValueCount += 1;
        if (typeof image === 'string') {
          assert.equal(
            image,
            image.trim(),
            `Static image URL contains surrounding whitespace: ${product.id}`
          );
        }
      }
    }
  }

  const conceMedUrl =
    'https://static2.xunxiang.site/uploads/sites/2086/2024/01/d398bc0c944a243ee45596058d0e22f1.jpg';
  const conceMedProduct = rawProducts.find(
    (product) => product.id === 'concemed-vp-1000-video-processor'
  );
  assert.ok(conceMedProduct, 'ConceMed VP-1000 regression product is missing');
  assert.equal(conceMedProduct.images[0], conceMedUrl, 'ConceMed source URL regressed');

  return imageValueCount;
};

const verifyOrigins = async (products) => {
  const { default: nextConfig } = await import(pathToFileURL(nextConfigPath));
  const configuredOrigins = new Set(
    (nextConfig.images?.remotePatterns ?? []).map(
      ({ protocol, hostname }) => `${protocol}://${hostname}`
    )
  );
  const remoteImages = products
    .flatMap(imageListsFor)
    .flat()
    .filter((image) => typeof image === 'string' && /^https?:\/\//.test(image));
  const staticOrigins = new Set(remoteImages.map((image) => new URL(image).origin));

  for (const origin of staticOrigins) {
    assert.ok(configuredOrigins.has(origin), `Missing next/image origin: ${origin}`);
  }
  assert.ok(
    configuredOrigins.has('https://res.cloudinary.com'),
    'Cloudinary next/image support is missing'
  );

  return { remoteImageCount: remoteImages.length, originCount: staticOrigins.size };
};

try {
  verifyDbShapedFixture();
  const { products, rawProducts } = loadStaticCatalog();
  const imageValueCount = verifyStaticCatalog(rawProducts, products);
  const { remoteImageCount, originCount } = await verifyOrigins(products);

  console.log(
    `PASS product images: fixture invariants; ${rawProducts.length} products; ` +
      `${imageValueCount} image values; ${remoteImageCount} remote images; ${originCount} origins`
  );
} catch (error) {
  console.error(`FAIL product images: ${error.message}`);
  process.exitCode = 1;
}
