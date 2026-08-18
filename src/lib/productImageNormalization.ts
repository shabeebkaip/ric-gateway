type ImageContainer = {
  images?: unknown;
};

type ProductImageContainer = ImageContainer & {
  variants?: unknown;
};

const trimImageStrings = (images: unknown[]) =>
  images.map((image) => (typeof image === 'string' ? image.trim() : image));

const normalizeVariantImages = (variant: unknown) => {
  if (
    !variant ||
    typeof variant !== 'object' ||
    Array.isArray(variant) ||
    !Array.isArray((variant as ImageContainer).images)
  ) {
    return variant;
  }

  return {
    ...variant,
    images: trimImageStrings((variant as ImageContainer).images as unknown[]),
  };
};

export const normalizeProductImages = <T extends ProductImageContainer>(product: T): T =>
  ({
    ...product,
    ...(Array.isArray(product.images) && {
      images: trimImageStrings(product.images),
    }),
    ...(Array.isArray(product.variants) && {
      variants: product.variants.map(normalizeVariantImages),
    }),
  }) as T;
