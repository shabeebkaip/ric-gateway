import { products } from "./products";

export const partners = [
  {
    id: "medispec",
    name: "Medispec",
    country: "USA",
    flag: "🇺🇸",
    logo: "/partners/medispec.svg",
    website: "https://medispec.com/",
    invertColor: true,
    categories: ["urology"],
    products: ["Shockwave Therapy", "ED Treatment", "Lithotripsy"],
  },
  {
    id: "dornier-medtech",
    name: "Dornier MedTech",
    country: "Germany",
    flag: "🇩🇪",
    logo: "/partners/dornier-medtech.png",
    website: "https://www.dornier.com/",
    invertColor: false,
    categories: [""],
    products: ["Lithotripsy Systems", "ESWL Technology", "Stone Treatment"],
    tag: "Maintenance",
  },
  {
    id: "wikkon",
    name: "Wikkon",
    country: "China",
    flag: "🇨🇳",
    logo: "/partners/wikkon.png",
    website: "https://www.eswl.com/about-us/",
    invertColor: false,
    categories: [""],
    products: ["ESWL Systems", "Lithotripsy", "Urological Equipment"],
  },
  {
    id: "potent-medical",
    name: "Potent Medical",
    country: "China",
    flag: "🇨🇳",
    logo: "/partners/potent-medical.webp",
    website: "https://www.potent-medical.com/",
    invertColor: false,
    categories: ["urology"],
    subcategories: ["urology-equipment"],
    products: ["Holmium Lasers", "Thulium Fiber Lasers", "Surgical Lasers"],
  },
  {
    id: "redpine",
    name: "Redpine",
    country: "China",
    flag: "🇨🇳",
    logo: "/partners/redpine.png",
    website: "https://en.redpinemed.com/",
    invertColor: false,
    categories: ["urology"],
    products: ["Endoscopy", "Imaging Systems", "Urological Instruments"],
  },
  {
    id: "allwin",
    name: "Allwin",
    country: "USA",
    flag: "🇺🇸",
    logo: "/partners/allwin.jpg",
    website: "https://allwinmedical.com/",
    invertColor: false,
    categories: ["urology"],
    subcategories: ["urology-consumables"],
    products: [
      "Ureteral Stents",
      "Renal Transplant Stents",
      "Medical Consumables",
    ],
  },
  {
    id: "boston-scientific",
    name: "Boston Scientific",
    country: "USA",
    flag: "🇺🇸",
    logo: "/partners/boston-scientific.png",
    website:
      "https://www.bostonscientific.com/en-US/patients-caregivers/device-support/penile-implants.html",
    invertColor: false,
    categories: [""],
    products: ["Penile Implants", "Urological Devices", "Endourology"],
    tag: "Penile Implants",
  },
  {
    id: "combat-medical",
    name: "COMBAT Medical",
    country: "United Kingdom",
    flag: "🇬🇧",
    logo: "/partners/combat-medical.png",
    website: "https://combatcancer.com/",
    invertColor: false,
    categories: ["cancer-treatment"],
    products: ["Oncology Equipment", "Cancer Therapy Systems", "Radiotherapy"],
  },
  {
    id: "basda",
    name: "BASDA",
    country: "China",
    flag: "🇨🇳",
    logo: "/partners/basda.png",
    website: "https://www.basdamri.com/",
    invertColor: false,
    categories: ["medical-imaging"],
    products: ["MRI Systems", "CT Scanners", "X-Ray Equipment"],
  },
  {
    id: "excite-medical",
    name: "Excite Medical",
    country: "USA",
    flag: "🇺🇸",
    logo: "/partners/excite.png",
    website: "https://excitemedical.com/",
    invertColor: true,
    categories: ["spinal-decompression"],
    products: [
      "Spinal Decompression Systems",
      "Therapy Equipment",
      "Treatment Solutions",
    ],
  },
  {
    id: "wego",
    name: "WEGO",
    country: "China",
    flag: "🇨🇳",
    logo: "/partners/WEGO.png",
    website: "https://www.wegomedical.com/",
    categories: ["orthopedics"],
    products: ["Orthopedic Treatment Solutions", "Diagnostic Equipment"],
  },
  {
    id: "enovis",
    name: "Enovis",
    country: "USA",
    flag: "🇺🇸",
    logo: "/partners/enovis.png",
    website: "https://enovis.com/",
    categories: ["orthopedics"],
    products: [
      "Orthopedic Implants",
      "Surgical Instruments",
      "Treatment Solutions",
    ],
    tag: "Under Registration",
  },

  {
    id: "concemed",
    name: "ConceMed",
    country: "China",
    flag: "🇨🇳",
    logo: "/partners/concemed.png",
    website: "https://www.concemed.com/",
    invertColor: false,
    categories: ["endoscopy"],
    products: ["Endoscopy Systems", "Gastroscopes", "Colonoscopy"],
    tag: "Under Registration",
  },
  {
    id: "adtec-premium-plasma",
    name: "Adtec Premium Plasma",
    country: "Japan",
    flag: "🇯🇵",
    logo: "https://adtechealthcare.com/wp-content/uploads/2025/09/AdTec_Horizontal-Full-colour-scaled.png",
    website: "https://adtechealthcare.com/",
    categories: ["wound-care"],
    products: ["Plasma Technology", "Medical Imaging Solutions"],
    tag: "Under Registration",
  },
  {
    id: "jingyi",
    name: "Jingyi Medical",
    country: "China",
    flag: "🇨🇳",
    logo: "/partners/jingyi-medical.png",
    website: "https://www.jingyimedical.com/",
    categories: ["plasma-surgical-devices"],
    products: ["Plasma Surgical Devices", "Medical Equipment"],
  },
];

// Product categories for navigation
export const productCategories = [
  {
    id: "cancer-treatment",
    name: "Cancer Treatment",
    slug: "cancer-treatment",
    description: "Advanced oncology equipment and cancer therapy systems",
    icon: "Microscope",
  },
  {
    id: "urology",
    name: "Urology",
    slug: "urology",
    description: "Comprehensive urological treatment and diagnostic solutions",
    icon: "Stethoscope",
  },
  {
    id: "medical-imaging",
    name: "Medical Imaging",
    slug: "medical-imaging",
    description: "State-of-the-art diagnostic imaging systems",
    icon: "ScanLine",
  },
  {
    id: "endoscopy",
    name: "Endoscopy",
    slug: "endoscopy",
    description:
      "Advanced gastroscope and colonoscope systems for diagnostic and therapeutic procedures",
    icon: "Activity",
  },
  {
    id: "spinal-decompression",
    name: "Spinal Decompression",
    slug: "spinal-decompression",
    description: "Advanced spinal decompression therapy systems and equipment",
    icon: "Settings2",
  },
  {
    id: "wound-care",
    name: "Wound Care (Cold Plasma)",
    slug: "wound-care",
    description: "Innovative wound care and management solutions",
    icon: "Package",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    slug: "orthopedics",
    description: "Comprehensive orthopedic treatment and diagnostic solutions",
    icon: "Activity",
  },
  {
    id: "plasma-surgical-devices",
    name: "Plasma Surgical Devices",
    slug: "plasma-surgical-devices",
    description:
      "Advanced plasma surgical devices for minimally invasive procedures",
    icon: "Zap",
  },
];

// Product subcategories linked to parent categories
export const productSubcategories = [
  // Urology subcategories
  {
    id: "urology-equipment",
    name: "Equipments",
    slug: "equipment",
    categoryId: "urology",
    description: "Advanced urological equipment and surgical systems",
    types: ["Lithotripsy", "Surgical Lasers", "Diagnostic Equipment"],
  },
  {
    id: "urology-consumables",
    name: "Consumables",
    slug: "consumables",
    categoryId: "urology",
    description: "Urological disposables and consumable products",
    types: ["Ureteral Stents", "Renal Transplant Stents", "Surgical Supplies"],
  },
  // Cancer Treatment subcategories
  {
    id: "cancer-treatment-systems",
    name: "Treatment Systems",
    slug: "treatment-systems",
    categoryId: "cancer-treatment",
    description: "Advanced cancer treatment and therapy systems",
    types: ["Bladder Cancer Treatment", "Chemotherapy Systems", "Radiotherapy"],
  },
  // Medical Imaging subcategories
  {
    id: "medical-imaging-systems",
    name: "Imaging Systems",
    slug: "imaging-systems",
    categoryId: "medical-imaging",
    description: "Diagnostic imaging and scanning systems",
    types: ["MRI Systems", "CT Scanners", "X-Ray Equipment"],
  },
  {
    id: "gastroscopy",
    name: "Gastroscopy",
    slug: "gastroscopy",
    categoryId: "endoscopy",
    description:
      "Gastroscopes and colonoscopes for gastrointestinal procedures",
    types: [
      "Video Gastroscopes",
      "Colonoscopy Systems",
      "Endoscopy Accessories",
    ],
  },
  {
    id: "colonoscopy",
    name: "Colonoscopy",
    slug: "colonoscopy",
    categoryId: "endoscopy",
    description:
      "Colonoscopy systems and accessories for colorectal procedures",
    types: [
      "Video Colonoscopes",
      "Colonoscopy Systems",
      "Endoscopy Accessories",
    ],
  },
  {
    id: "endoscopy-imaging-systems",
    name: "Imaging Systems",
    slug: "imaging-systems",
    categoryId: "endoscopy",
    description:
      "Video processors and imaging systems for endoscopic procedures",
    types: [
      "Video Processors",
      "Image Processing Systems",
      "LED Light Sources",
    ],
  },
  {
    id: "infection-management",
    name: "Infection Management",
    slug: "infection-management",
    categoryId: "wound-care",
    description: "Infection control and management solutions",
    types: ["Antimicrobial Dressings", "Wound Cleansing Products"],
  },
  {
    id: "trauma",
    name: "Trauma",
    slug: "trauma",
    categoryId: "orthopedics",
    description: "Trauma care and management solutions",
    types: ["Fracture Fixation", "Trauma Implants", "Surgical Instruments"],
  },
  {
    id: "foot-and-ankle",
    name: "Foot & Ankle",
    slug: "foot-and-ankle",
    categoryId: "orthopedics",
    description: "Foot and ankle care and management solutions",
    types: [
      "Foot & Ankle Implants",
      "Surgical Instruments",
      "Treatment Solutions",
    ],
  },
];

// Company stats

// Company features
export const companyFeatures = [
  {
    icon: "Award",
    title: "ISO Certified Operations",
    description:
      "Maintaining international quality standards in all our processes and services.",
  },
  {
    icon: "Shield",
    title: "SFDA Approved Products",
    description:
      "All our medical equipment meets Saudi FDA regulatory requirements.",
  },
  {
    icon: "Headphones",
    title: "Comprehensive Support",
    description:
      "From installation to maintenance, our team provides complete technical support.",
  },
  {
    icon: "TrendingUp",
    title: "Continuous Innovation",
    description:
      "Staying ahead with the latest medical technologies and healthcare solutions.",
  },
];

// Company values (Vision, Mission, Values)
export const companyValues = [
  {
    icon: "Eye",
    title: "Our Vision",
    description:
      "Keep pace with fast-moving technology for Saudi Arabia's 2030 vision to accomplish excellence in healthy living by offering complete medical solutions.",
    gradient: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: "Target",
    title: "Our Mission",
    description:
      "Inspire hope and improve quality of life by offering verifiable, effective professional solutions ensuring partner satisfaction.",
    gradient: "from-accent/10 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: "Heart",
    title: "Our Values",
    description:
      "Trust, loyalty, and respect — the constant fundamentals of our commitment to excellence in healthcare partnerships.",
    gradient: "from-gold/10 to-gold/5",
    iconColor: "text-gold",
  },
];



export const companyStats = {
  yearsFounded: 1985,
  partnersCount: partners.length,
  categoriesCount: productCategories.length,
  productsCount: products.length,
  facilitiesServed: "100+",
  support: "24/7",
};

export const contactInfo = {
  companyName:
    "Riyadh International Corporation Medical Equipments & Services, Ltd",
  address: {
    full: "PM8M+J6X, Oruba Road, As Sulimaniyah, Riyadh 11411, Saudi Arabia",
  },
  phone: {
    primary: "+966509698043",
    secondary: "+966114654113",
    extenstion: "Ext. 106",
    fax: "+966114630135",
  },
  email: "ricmede@ricmedical.com.sa",
  workingHours: "Sun - Thu: 8AM - 5PM",
};
