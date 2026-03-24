import 'dotenv/config';
import { connectDB } from '../src/lib/db/connection';
import Partner from '../src/lib/db/models/Partner';

const partnersData = [
  {
    slug: 'medispec',
    name: 'Medispec',
    country: 'USA',
    flag: '🇺🇸',
    logo: '/partners/medispec.svg',
    website: 'https://medispec.com/',
    invertColor: true,
    categories: ['urology'],
    subcategories: [],
    products: ['Shockwave Therapy', 'ED Treatment', 'Lithotripsy'],
    order: 1,
  },
  {
    slug: 'dornier-medtech',
    name: 'Dornier MedTech',
    country: 'Germany',
    flag: '🇩🇪',
    logo: '/partners/dornier-medtech.png',
    website: 'https://www.dornier.com/',
    invertColor: false,
    categories: [],
    subcategories: [],
    products: ['Lithotripsy Systems', 'ESWL Technology', 'Stone Treatment'],
    tag: 'Maintenance',
    order: 2,
  },
  {
    slug: 'wikkon',
    name: 'Wikkon',
    country: 'China',
    flag: '🇨🇳',
    logo: '/partners/wikkon.png',
    website: 'https://www.eswl.com/about-us/',
    invertColor: false,
    categories: [],
    subcategories: [],
    products: ['ESWL Systems', 'Lithotripsy', 'Urological Equipment'],
    order: 3,
  },
  {
    slug: 'potent-medical',
    name: 'Potent Medical',
    country: 'China',
    flag: '🇨🇳',
    logo: '/partners/potent-medical.webp',
    website: 'https://www.potent-medical.com/',
    invertColor: false,
    categories: ['urology'],
    subcategories: ['urology-equipment'],
    products: ['Holmium Lasers', 'Thulium Fiber Lasers', 'Surgical Lasers'],
    order: 4,
  },
  {
    slug: 'redpine',
    name: 'Redpine',
    country: 'China',
    flag: '🇨🇳',
    logo: '/partners/redpine.png',
    website: 'https://en.redpinemed.com/',
    invertColor: false,
    categories: ['urology'],
    subcategories: [],
    products: ['Endoscopy', 'Imaging Systems', 'Urological Instruments'],
    order: 5,
  },
  {
    slug: 'allwin',
    name: 'Allwin',
    country: 'USA',
    flag: '🇺🇸',
    logo: '/partners/allwin.jpg',
    website: 'https://allwinmedical.com/',
    invertColor: false,
    categories: ['urology'],
    subcategories: ['urology-consumables'],
    products: ['Ureteral Stents', 'Renal Transplant Stents', 'Medical Consumables'],
    order: 6,
  },
  {
    slug: 'boston-scientific',
    name: 'Boston Scientific',
    country: 'USA',
    flag: '🇺🇸',
    logo: '/partners/boston-scientific.png',
    website: 'https://www.bostonscientific.com/en-US/patients-caregivers/device-support/penile-implants.html',
    invertColor: false,
    categories: [],
    subcategories: [],
    products: ['Penile Implants', 'Urological Devices', 'Endourology'],
    tag: 'Penile Implants',
    order: 7,
  },
  {
    slug: 'combat-medical',
    name: 'COMBAT Medical',
    country: 'United Kingdom',
    flag: '🇬🇧',
    logo: '/partners/combat-medical.png',
    website: 'https://combatcancer.com/',
    invertColor: false,
    categories: ['cancer-treatment'],
    subcategories: [],
    products: ['Oncology Equipment', 'Cancer Therapy Systems', 'Radiotherapy'],
    order: 8,
  },
  {
    slug: 'basda',
    name: 'BASDA',
    country: 'China',
    flag: '🇨🇳',
    logo: '/partners/basda.png',
    website: 'https://www.basdamri.com/',
    invertColor: false,
    categories: ['medical-imaging'],
    subcategories: [],
    products: ['MRI Systems', 'CT Scanners', 'X-Ray Equipment'],
    order: 9,
  },
  {
    slug: 'excite-medical',
    name: 'Excite Medical',
    country: 'USA',
    flag: '🇺🇸',
    logo: '/partners/excite.png',
    website: 'https://excitemedical.com/',
    invertColor: true,
    categories: ['spinal-decompression'],
    subcategories: [],
    products: ['Spinal Decompression Systems', 'Therapy Equipment', 'Treatment Solutions'],
    order: 10,
  },
  {
    slug: 'wego',
    name: 'WEGO',
    country: 'China',
    flag: '🇨🇳',
    logo: '/partners/WEGO.png',
    website: 'https://www.wegomedical.com/',
    invertColor: false,
    categories: ['orthopedics'],
    subcategories: [],
    products: ['Orthopedic Treatment Solutions', 'Diagnostic Equipment'],
    order: 11,
  },
  {
    slug: 'enovis',
    name: 'Enovis',
    country: 'USA',
    flag: '🇺🇸',
    logo: '/partners/enovis.png',
    website: 'https://enovis.com/',
    invertColor: false,
    categories: ['orthopedics'],
    subcategories: [],
    products: ['Orthopedic Implants', 'Surgical Instruments', 'Treatment Solutions'],
    tag: 'Under Registration',
    order: 12,
  },
  {
    slug: 'concemed',
    name: 'ConceMed',
    country: 'China',
    flag: '🇨🇳',
    logo: '/partners/concemed.png',
    website: 'https://www.concemed.com/',
    invertColor: false,
    categories: ['endoscopy'],
    subcategories: [],
    products: ['Endoscopy Systems', 'Gastroscopes', 'Colonoscopy'],
    tag: 'Under Registration',
    order: 13,
  },
  {
    slug: 'adtec-premium-plasma',
    name: 'Adtec Premium Plasma',
    country: 'Japan',
    flag: '🇯🇵',
    logo: 'https://adtechealthcare.com/wp-content/uploads/2025/09/AdTec_Horizontal-Full-colour-scaled.png',
    website: 'https://adtechealthcare.com/',
    invertColor: false,
    categories: ['wound-care'],
    subcategories: [],
    products: ['Plasma Technology', 'Medical Imaging Solutions'],
    tag: 'Under Registration',
    order: 14,
  },
  {
    slug: 'jingyi',
    name: 'Jingyi Medical',
    country: 'China',
    flag: '🇨🇳',
    logo: '/partners/jingyi-medical.png',
    website: 'https://www.jingyimedical.com/',
    invertColor: false,
    categories: ['plasma-surgical-devices'],
    subcategories: [],
    products: ['Plasma Surgical Devices', 'Medical Equipment'],
    tag: 'Under Registration',
    order: 15,
  },
];

async function seedPartners() {
  try {
    await connectDB();
    console.log('🌱 Starting partners seed...');

    let created = 0;
    let updated = 0;

    for (const partnerData of partnersData) {
      const existing = await Partner.findOne({ slug: partnerData.slug });

      if (existing) {
        await Partner.updateOne({ slug: partnerData.slug }, { $set: partnerData });
        console.log(`  ✏️  Updated: ${partnerData.name}`);
        updated++;
      } else {
        await Partner.create({ ...partnerData, isActive: true });
        console.log(`  ✅ Created: ${partnerData.name}`);
        created++;
      }
    }

    console.log(`\n🎉 Partners seed complete — ${created} created, ${updated} updated.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seedPartners();
