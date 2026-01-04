export const partners = [
  {
    name: "BASDA",
    country: "China",
    flag: "🇨🇳",
    logo: "/partners/basda.png",
    website: "https://www.basdamri.com/",
    invertColor: false,
    categories: ["Medical Imaging"],
    products: ["MRI Systems", "CT Scanners", "X-Ray Equipment"],
  },
  {
    name: "Boston Scientific",
    country: "USA",
    flag: "🇺🇸",
    logo: "/partners/boston-scientific.png",
    website:
      "https://www.bostonscientific.com/en-US/patients-caregivers/device-support/penile-implants.html",
    invertColor: false,
    categories: ["Urology"],
    products: ["Penile Implants", "Urological Devices", "Endourology"],
  },
  {
    name: "Combat Medical Ltd",
    country: "United Kingdom",
    flag: "🇬🇧",
    logo: "/partners/combat-medical.png",
    website: "https://combatcancer.com/",
    invertColor: false,
    categories: ["Cancer Treatment"],
    products: ["Oncology Equipment", "Cancer Therapy Systems", "Radiotherapy"],
  },
  {
    name: "Dornier MedTech",
    country: "Germany",
    flag: "🇩🇪",
    logo: "/partners/dornier-medtech.png",
    website: "https://www.dornier.com/",
    invertColor: false,
    categories: ["Urology"],
    products: ["Lithotripsy Systems", "ESWL Technology", "Stone Treatment"],
  },
  {
    name: "Wikkon",
    country: "China",
    flag: "🇨🇳",
    logo: "/partners/wikkon.png",
    website: "https://www.eswl.com/about-us/",
    invertColor: false,
    categories: ["Urology"],
    products: ["ESWL Systems", "Lithotripsy", "Urological Equipment"],
  },
  {
    name: "Excite Medical",
    country: "USA",
    flag: "🇺🇸",
    logo: "/partners/excite.png",
    website: "https://excitemedical.com/",
    invertColor: true,
    categories: ["Cancer Treatment"],
    products: ["Surgical Oncology", "Cancer Diagnostics", "Treatment Solutions"],
  },
  {
    name: "Redpine",
    country: "China",
    flag: "🇨🇳",
    logo: "/partners/redpine.png",
    website: "https://en.redpinemed.com/",
    invertColor: false,
    categories: ["Urology", "Medical Imaging"],
    products: ["Endoscopy", "Imaging Systems", "Urological Instruments"],
  },
  {
    name: "Allwin",
    country: "USA",
    flag: "🇺🇸",
    logo: "/partners/allwin.jpg",
    website: "https://allwinmedical.com/",
    invertColor: false,
    categories: ["Disposables"],
    products: ["Surgical Disposables", "Medical Consumables", "Healthcare Supplies"],
  },
  {
    name: "Medispec",
    country: "USA",
    flag: "🇺🇸",
    logo: "/partners/medispec.svg",
    website: "https://medispec.com/",
    invertColor: true,
    categories: ["Urology"],
    products: ["Shockwave Therapy", "ED Treatment", "Lithotripsy"],
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
    id: "disposables",
    name: "Disposables",
    slug: "disposables",
    description: "Quality medical consumables and supplies",
    icon: "Package",
  },
];

// Company stats
export const companyStats = {
  yearsFounded: 1985,
  partnersCount: partners.length,
  categoriesCount: productCategories.length,
  facilitiesServed: "100+",
  support: "24/7",
};

// Company features
export const companyFeatures = [
  {
    icon: "Award",
    title: "ISO Certified Operations",
    description: "Maintaining international quality standards in all our processes and services.",
  },
  {
    icon: "Shield",
    title: "SFDA Approved Products",
    description: "All our medical equipment meets Saudi FDA regulatory requirements.",
  },
  {
    icon: "Headphones",
    title: "Comprehensive Support",
    description: "From installation to maintenance, our team provides complete technical support.",
  },
  {
    icon: "TrendingUp",
    title: "Continuous Innovation",
    description: "Staying ahead with the latest medical technologies and healthcare solutions.",
  },
];

// Company values (Vision, Mission, Values)
export const companyValues = [
  {
    icon: "Eye",
    title: "Our Vision",
    description: "Keep pace with fast-moving technology for Saudi Arabia's 2030 vision to accomplish excellence in healthy living by offering complete medical solutions.",
    gradient: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: "Target",
    title: "Our Mission",
    description: "Inspire hope and improve quality of life by offering verifiable, effective professional solutions ensuring partner satisfaction.",
    gradient: "from-accent/10 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: "Heart",
    title: "Our Values",
    description: "Trust, loyalty, and respect — the constant fundamentals of our commitment to excellence in healthcare partnerships.",
    gradient: "from-gold/10 to-gold/5",
    iconColor: "text-gold",
  },
];
