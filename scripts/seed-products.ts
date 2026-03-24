import 'dotenv/config';
import { connectDB } from '../src/lib/db/connection';
import Product from '../src/lib/db/models/Product';
import { products } from '../src/lib/products';

// Fallback map: brand name (lowercase) → partner slug
const brandToPartner: Record<string, string> = {
  medispec: 'medispec',
  'potent medical': 'potent-medical',
  'combat medical': 'combat-medical',
  basda: 'basda',
  'allwin medical devices': 'allwin',
  redpine: 'redpine',
  'dornier medtech': 'dornier-medtech',
  wikkon: 'wikkon',
  'boston scientific': 'boston-scientific',
  excitemedical: 'excite-medical',
  'excite medical': 'excite-medical',
  enovis: 'enovis',
  concemed: 'concemed',
  'adtec premium plasma': 'adtec-premium-plasma',
  adtec: 'adtec-premium-plasma',
  wego: 'wego',
  'wego ortho': 'wego',
  jingyi: 'jingyi',
  'jingyi medical': 'jingyi',
};

function resolvePartner(p: any): string {
  if (p.partnerId) return p.partnerId;
  const key = (p.brand ?? '').toLowerCase().trim();
  return brandToPartner[key] ?? key;
}

async function seedProducts() {
  try {
    await connectDB();
    console.log('🌱 Starting products seed...');

    let created = 0;
    let updated = 0;

    for (let i = 0; i < products.length; i++) {
      const p = products[i] as any;

      const doc = {
        title: p.name,
        slug: p.id,
        description: p.description ?? '',
        category: p.category ?? '',
        subcategory: p.sub_category ?? '',
        partner: resolvePartner(p),
        type: p.product_type ?? '',
        images: Array.isArray(p.images) ? p.images : [],
        thumbnail: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : '',
        features: Array.isArray(p.features) ? p.features : [],
        specifications: p.technical_specifications ?? {},
        technicalData: {},
        additionalInfo: {
          is_parent_product: p.is_parent_product ?? false,
          applications: p.applications ?? [],
          certifications: p.certifications ?? [],
          variants: p.variants ?? [],
          accessories_included: p.accessories_included ?? [],
          regulatory: p.regulatory ?? {},
          manufacturer: p.manufacturer ?? {},
          support_contact: p.support_contact ?? {},
          show_image_main: p.show_image_main ?? false,
        },
        isActive: true,
        isPremium: false,
        isFeatured: false,
        order: i,
      };

      const existing = await Product.findOne({ slug: p.id });
      if (existing) {
        await Product.updateOne({ slug: p.id }, { $set: doc });
        console.log(`  ✏️  Updated: ${p.name}`);
        updated++;
      } else {
        await Product.create(doc);
        console.log(`  ✅ Created: ${p.name}`);
        created++;
      }
    }

    console.log(`\n🎉 Products seed complete — ${created} created, ${updated} updated.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seedProducts();
