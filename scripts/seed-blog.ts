/**
 * Seed script: Blog Posts
 *
 * Inserts 5 sample blog posts covering RIC's core topic clusters.
 * Skips posts that already exist (upserts by slug).
 *
 * Usage:
 *   pnpm tsx scripts/seed-blog.ts
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import BlogPost from '../src/lib/db/models/BlogPost';

const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI environment variable is not set.');
  process.exit(1);
}

const posts = [
  {
    title: 'Vision 2030 and the Future of Healthcare in Saudi Arabia',
    slug: 'vision-2030-future-healthcare-saudi-arabia',
    excerpt:
      'Saudi Arabia\'s Vision 2030 is fundamentally reshaping the healthcare sector. From privatisation to digital transformation, here is what medical equipment providers and healthcare facilities need to know.',
    content: `<h2>A Healthcare System in Transformation</h2>
<p>Saudi Arabia's Vision 2030 initiative has set an ambitious agenda for the Kingdom's healthcare sector. With a target to increase private sector participation from 40% to 65% by 2030, the landscape for medical equipment procurement, hospital management, and clinical services is changing at an unprecedented pace.</p>
<p>For healthcare facilities across Riyadh, Jeddah, and the wider Kingdom, this transformation creates both opportunity and urgency. New hospitals are being built, existing facilities are being upgraded, and the demand for advanced medical equipment has never been higher.</p>

<h2>Key Healthcare Reforms Under Vision 2030</h2>
<p>The Vision 2030 healthcare programme operates through several interconnected pillars:</p>
<ul>
<li><strong>Health Sector Transformation Programme (HSTP):</strong> A comprehensive reform agenda covering digital health, quality standards, and privatisation of government hospitals.</li>
<li><strong>National Transformation Programme:</strong> Investing in primary care infrastructure, preventive medicine, and telemedicine platforms.</li>
<li><strong>Private Sector Expansion:</strong> Encouraging international healthcare providers and medical equipment manufacturers to establish local partnerships.</li>
</ul>

<h2>What This Means for Medical Equipment</h2>
<p>The rapid expansion of healthcare infrastructure directly drives demand for advanced medical equipment across all specialties. Oncology centres, cardiac catheterisation labs, imaging centres, and urology departments are all being built or upgraded to international standards.</p>
<p>The Saudi Food and Drug Authority (SFDA) continues to strengthen its regulatory framework, meaning that SFDA-approved, ISO-certified equipment is not just preferred — it is increasingly mandatory for facility accreditation.</p>

<h2>Digital Health and Connectivity</h2>
<p>Vision 2030 places significant emphasis on digital health transformation. Medical equipment that integrates with hospital information systems, supports PACS (Picture Archiving and Communication Systems), and enables remote diagnostics is becoming a key procurement criterion.</p>
<p>Facilities investing in connected medical devices today are building the infrastructure for tomorrow's value-based healthcare model.</p>

<h2>RIC's Role in Saudi Healthcare Transformation</h2>
<p>Since 1985, Riyadh International Corporation has been a trusted partner to Saudi Arabia's healthcare institutions. As the Kingdom accelerates its Vision 2030 health agenda, RIC continues to supply SFDA-approved, internationally certified medical equipment across oncology, urology, medical imaging, and orthopedics.</p>
<p>Our relationships with leading global manufacturers ensure that Saudi healthcare facilities have access to the latest technologies — fully supported by our in-country technical team.</p>`,
    coverImage: '',
    category: 'industry-insights',
    tags: ['vision-2030', 'saudi-healthcare', 'medical-technology', 'sfda', 'healthcare-reform'],
    author: { name: 'RIC Medical Team', role: 'Healthcare Industry Analysts', avatar: '' },
    isFeatured: true,
    isPublished: true,
    publishedAt: new Date('2025-09-15'),
    readTime: 5,
    order: 1,
  },
  {
    title: 'Understanding Radiation Oncology Equipment: A Guide for Saudi Healthcare Facilities',
    slug: 'radiation-oncology-equipment-guide-saudi-healthcare',
    excerpt:
      'Selecting the right radiation therapy equipment is one of the most critical decisions a cancer centre can make. This guide covers the key technologies, clinical considerations, and procurement factors for facilities in Saudi Arabia.',
    content: `<h2>The Growing Burden of Cancer in Saudi Arabia</h2>
<p>Cancer incidence in Saudi Arabia has been rising steadily, with the Saudi Cancer Registry reporting significant increases across multiple cancer types. This epidemiological reality, combined with Vision 2030's healthcare expansion agenda, has driven substantial investment in oncology infrastructure across the Kingdom.</p>
<p>Radiation therapy remains one of the three pillars of cancer treatment alongside surgery and chemotherapy. For any cancer centre — whether standalone or integrated within a general hospital — the choice of radiation oncology equipment is a defining decision that will shape clinical outcomes for a decade or more.</p>

<h2>Key Radiation Therapy Technologies</h2>
<h3>Linear Accelerators (LINAC)</h3>
<p>The linear accelerator is the workhorse of modern radiation oncology. Contemporary LINACs deliver sophisticated treatment techniques including IMRT (Intensity-Modulated Radiation Therapy), VMAT (Volumetric Modulated Arc Therapy), and stereotactic radiosurgery (SRS).</p>
<p>When selecting a LINAC, facilities should evaluate: energy modes available, imaging capabilities (CBCT, MV imaging), treatment planning system integration, and vendor service infrastructure in Saudi Arabia.</p>

<h3>Brachytherapy Systems</h3>
<p>High-dose-rate (HDR) brachytherapy remains the gold standard for cervical, prostate, and breast cancer treatment in appropriate cases. Modern afterloading systems provide precise dose delivery with reduced radiation exposure to clinical staff.</p>

<h3>Simulation and Planning Infrastructure</h3>
<p>A radiation oncology programme is only as strong as its planning infrastructure. CT simulators, treatment planning systems, and dosimetry equipment are foundational to safe and effective treatment delivery.</p>

<h2>Regulatory Considerations in Saudi Arabia</h2>
<p>All radiation-producing equipment in Saudi Arabia requires approval from the Saudi Food and Drug Authority (SFDA) and compliance with Saudi Radiation Protection Authority (SRPA) standards. Facilities should confirm that equipment suppliers can provide full SFDA documentation and support the licensing process.</p>

<h2>Total Cost of Ownership</h2>
<p>The procurement price of a LINAC represents only a fraction of its total cost of ownership over a 10-15 year lifespan. Prospective buyers must factor in: installation and commissioning costs, annual service contracts, consumables (applicators, dosimetry tools), staff training, and eventual decommissioning.</p>
<p>Engaging a supplier with established in-country technical support — not just sales representation — is essential for managing lifecycle costs and minimising downtime.</p>`,
    coverImage: '',
    category: 'clinical-education',
    tags: ['oncology', 'radiation-therapy', 'linac', 'brachytherapy', 'cancer-treatment', 'sfda'],
    author: { name: 'RIC Clinical Advisory Team', role: 'Oncology Equipment Specialists', avatar: '' },
    isFeatured: false,
    isPublished: true,
    publishedAt: new Date('2025-10-08'),
    readTime: 6,
    order: 2,
  },
  {
    title: 'Choosing the Right Urology Endoscopy System: A Buyer\'s Guide',
    slug: 'urology-endoscopy-system-buyers-guide',
    excerpt:
      'Urology endoscopy is one of the most procedure-intensive specialties. Selecting the right flexible and rigid endoscopy platform can significantly impact clinical throughput, patient outcomes, and operational costs.',
    content: `<h2>The Scope of Urology Endoscopy</h2>
<p>Urology endoscopy encompasses a wide range of diagnostic and therapeutic procedures — from flexible cystoscopy for bladder cancer surveillance to complex percutaneous nephrolithotomy (PCNL) for staghorn calculi. The breadth of procedures means that urology departments typically require a coordinated portfolio of endoscopy equipment rather than a single device.</p>

<h2>Rigid vs. Flexible Endoscopy</h2>
<h3>Rigid Endoscopes</h3>
<p>Rigid cystoscopes and ureteroscopes remain the standard for many operative procedures. Their advantages include optical clarity, durability, and compatibility with a wide range of working instruments. Modern rigid systems offer high-definition imaging with 4K capability, significantly improving tissue characterisation and lesion detection.</p>

<h3>Flexible Ureteroscopes</h3>
<p>Single-use flexible ureteroscopes have become increasingly prevalent in urology departments seeking to eliminate cross-contamination risk and reduce reprocessing costs. While the per-procedure cost is higher than reusable scopes, the elimination of repair costs and reprocessing infrastructure can make single-use a cost-effective choice for lower-volume departments.</p>
<p>Reusable digital flexible ureteroscopes offer superior image quality and are more cost-effective for high-volume stone programmes. The decision between single-use and reusable should be based on procedure volume, reprocessing capability, and risk tolerance.</p>

<h2>Imaging and Integration</h2>
<p>Modern urology endoscopy requires more than optics alone. Narrow-band imaging (NBI) and photodynamic diagnosis (PDD) enhance the detection of flat bladder lesions and carcinoma in situ. Facilities should ensure that their endoscopy tower supports the imaging modalities relevant to their case mix.</p>
<p>Integration with hospital information systems for procedure documentation, image archiving, and reporting is increasingly important for JCI-accredited facilities.</p>

<h2>Lithotripsy Integration</h2>
<p>For stone programmes, the laser lithotripsy system is as important as the ureteroscope. Holmium:YAG lasers remain the workhorse for urolithiasis, while thulium fibre lasers represent the emerging technology offering superior fragmentation efficiency and reduced retropulsion.</p>

<h2>Procurement Considerations</h2>
<p>When evaluating urology endoscopy platforms, procurement teams should request: clinical reference visits to comparable facilities, demonstration of reprocessing and sterilisation workflow, comprehensive service level agreements with response time commitments, and training programmes for nursing and technical staff.</p>`,
    coverImage: '',
    category: 'clinical-education',
    tags: ['urology', 'endoscopy', 'cystoscopy', 'ureteroscopy', 'lithotripsy', 'medical-equipment'],
    author: { name: 'RIC Urology Division', role: 'Urology Equipment Specialists', avatar: '' },
    isFeatured: false,
    isPublished: true,
    publishedAt: new Date('2025-11-03'),
    readTime: 6,
    order: 3,
  },
  {
    title: 'RIC Medical: 40 Years of Healthcare Excellence in Saudi Arabia',
    slug: 'ric-medical-40-years-healthcare-excellence-saudi-arabia',
    excerpt:
      'In 2025, Riyadh International Corporation marks four decades of serving Saudi Arabia\'s healthcare sector. We reflect on the journey — from our founding in 1985 to becoming one of the Kingdom\'s most trusted medical equipment distributors.',
    content: `<h2>A Journey That Began in 1985</h2>
<p>When Riyadh International Corporation was established in 1985, Saudi Arabia's healthcare sector was at a pivotal moment of development. The Kingdom was investing heavily in building a modern healthcare system, and the demand for reliable, high-quality medical equipment was growing rapidly.</p>
<p>RIC was founded with a clear mission: to be the trusted bridge between the world's leading medical technology manufacturers and Saudi Arabia's healthcare institutions. Forty years later, that mission remains at the heart of everything we do.</p>

<h2>Building Partnerships That Last</h2>
<p>From our earliest days, RIC understood that sustainable success in medical equipment distribution is built on long-term relationships — not transactions. We invested in partnerships with internationally recognised manufacturers whose commitment to quality and innovation matched our own.</p>
<p>Over four decades, these partnerships have deepened. Our principals trust us to represent their brands with integrity, and our hospital customers trust us to deliver equipment that performs reliably in the demanding environment of clinical care.</p>

<h2>Milestones Across Four Decades</h2>
<ul>
<li><strong>1985:</strong> RIC founded in Riyadh, beginning operations in medical equipment distribution.</li>
<li><strong>1990s:</strong> Expansion into oncology and urology equipment, establishing specialist divisions.</li>
<li><strong>2000s:</strong> ISO certification achieved; SFDA registration processes established for all product lines.</li>
<li><strong>2010s:</strong> Launch of medical imaging division; expansion of technical service capabilities.</li>
<li><strong>2020s:</strong> Digital transformation of operations; alignment with Vision 2030 healthcare agenda.</li>
</ul>

<h2>Our People: The Foundation of Our Success</h2>
<p>Behind every piece of equipment we supply is a team of specialists — engineers, clinical advisors, logistics professionals, and customer support staff — who are committed to delivering excellence. Many of our team members have spent their entire careers at RIC, bringing institutional knowledge and deep expertise to every customer interaction.</p>

<h2>Looking Forward</h2>
<p>Saudi Arabia's healthcare sector is in an extraordinary period of growth and transformation. Vision 2030 is creating new hospitals, upgrading existing facilities, and raising the standard of care across the Kingdom. RIC is positioned to be a central partner in this transformation — bringing the world's best medical technologies to Saudi healthcare providers, supported by our established infrastructure and 40 years of trusted relationships.</p>
<p>We are grateful to every hospital, clinic, and healthcare professional who has placed their trust in RIC over these four decades. The next chapter is even more exciting than the last.</p>`,
    coverImage: '',
    category: 'company-news',
    tags: ['ric', 'anniversary', 'saudi-healthcare', 'medical-equipment', 'riyadh'],
    author: { name: 'RIC Communications Team', role: 'Riyadh International Corporation', avatar: '' },
    isFeatured: false,
    isPublished: true,
    publishedAt: new Date('2025-12-01'),
    readTime: 4,
    order: 4,
  },
  {
    title: 'Medical Imaging in Saudi Arabia: MRI, CT, and Digital Pathology Trends',
    slug: 'medical-imaging-mri-ct-digital-pathology-saudi-arabia',
    excerpt:
      'Medical imaging is the fastest-growing equipment segment in Saudi Arabia\'s healthcare sector. This article examines the key trends in MRI, CT, ultrasound, and digital pathology — and what they mean for facility planners.',
    content: `<h2>Imaging at the Centre of Modern Diagnosis</h2>
<p>Medical imaging sits at the intersection of nearly every clinical specialty. From the emergency department's CT scanner to the oncology centre's PET-CT, from the cardiology department's echocardiography lab to the pathology department's digital slide scanner — imaging technology is fundamental to modern healthcare delivery.</p>
<p>Saudi Arabia's imaging equipment market is experiencing sustained growth, driven by new hospital construction, facility upgrades, and the growing emphasis on preventive and early-detection medicine under Vision 2030.</p>

<h2>MRI: The Premium Diagnostic Tool</h2>
<h3>Field Strength Decisions</h3>
<p>The choice between 1.5T and 3T MRI systems remains one of the most significant decisions in radiology department planning. While 3T systems offer superior spatial resolution and faster scan times for many applications, 1.5T systems remain clinically appropriate for a wide range of indications and carry lower acquisition and operating costs.</p>
<p>For facilities with diverse patient populations, a 1.5T system often provides the optimal balance of clinical capability, patient throughput, and operational simplicity. Larger tertiary centres and academic hospitals typically benefit from 3T capability.</p>

<h3>AI-Assisted MRI</h3>
<p>Artificial intelligence is transforming MRI workflow. AI-powered image reconstruction (such as deep learning reconstruction algorithms) enables diagnostic-quality images at significantly reduced scan times, improving patient throughput and reducing the challenges associated with patient motion.</p>

<h2>CT: Speed, Dose, and Spectral Imaging</h2>
<p>Modern CT systems have advanced dramatically in three dimensions: speed (enabled by higher detector counts and wider gantry apertures), dose reduction (through AI-based reconstruction and optimised protocols), and spectral imaging capability (dual-energy CT enabling material decomposition and virtual monochromatic imaging).</p>
<p>For Saudi facilities, the ability to perform CT angiography, oncology staging, cardiac CT, and emergency trauma imaging on a single platform — while maintaining acceptable radiation dose levels — is a key purchasing criterion.</p>

<h2>Digital Pathology: The Emerging Frontier</h2>
<p>Digital pathology represents perhaps the most transformative shift in laboratory medicine in a generation. Whole-slide imaging systems digitise glass histology slides, enabling remote reporting, AI-assisted diagnosis, and multi-site consultation workflows.</p>
<p>For Saudi Arabia, where pathologist density relative to population remains a challenge, digital pathology offers a powerful tool for improving diagnostic capacity and enabling specialist oversight across geographically distributed facilities.</p>

<h2>Ultrasound: Bedside and Beyond</h2>
<p>Point-of-care ultrasound (POCUS) has expanded dramatically beyond cardiology and obstetrics. Emergency physicians, intensivists, and even general practitioners are integrating ultrasound into their clinical practice. Modern portable ultrasound systems with AI-guided image acquisition are making high-quality ultrasound accessible in settings where it was previously impractical.</p>

<h2>Selecting Your Imaging Partner</h2>
<p>When evaluating imaging equipment for your facility, look beyond the system specification to the total partnership: installation support, physicist commissioning, staff training, preventive maintenance programmes, and the availability of genuine replacement parts. Imaging equipment downtime has a direct impact on patient care and revenue — choosing a supplier with proven in-country service capability is as important as the equipment specification itself.</p>`,
    coverImage: '',
    category: 'product-spotlight',
    tags: ['medical-imaging', 'mri', 'ct-scan', 'digital-pathology', 'ultrasound', 'radiology', 'saudi-arabia'],
    author: { name: 'RIC Imaging Division', role: 'Medical Imaging Specialists', avatar: '' },
    isFeatured: false,
    isPublished: true,
    publishedAt: new Date('2026-01-20'),
    readTime: 7,
    order: 5,
  },
];

async function main() {
  console.log('🔌  Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log('✅  Connected.\n');

  console.log('📝  Seeding blog posts...');

  let inserted = 0;
  let skipped = 0;

  for (const post of posts) {
    const existing = await BlogPost.findOne({ slug: post.slug });
    if (existing) {
      console.log(`   ⏭  Skipped (already exists): ${post.slug}`);
      skipped++;
      continue;
    }
    await BlogPost.create(post);
    console.log(`   ✅  Created: ${post.slug}`);
    inserted++;
  }

  const total = await BlogPost.countDocuments();

  console.log('\n📊  Summary:');
  console.log(`   inserted : ${inserted}`);
  console.log(`   skipped  : ${skipped}`);
  console.log(`   total    : ${total} blog posts in database`);

  await mongoose.disconnect();
  console.log('\n✅  Done.\n');
}

main().catch((err) => {
  console.error('❌  Seed failed:', err);
  process.exit(1);
});
