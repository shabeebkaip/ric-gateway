import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../src/lib/db/connection';
import Content from '../src/lib/db/models/Content';

const heroContent = {
  page: 'home',
  section: 'hero',
  content: {
    badge: 'Trusted Since 1985',
    title: 'Transforming Healthcare',
    titleHighlight: 'Through Innovation',
    description: 'Leading provider of advanced medical solutions in Saudi Arabia. Excellence in Medical Technology & Patient Care.',
    ctaText: 'Explore Our Solutions',
    ctaLink: '/products',
    secondaryCtaText: 'Contact Us',
    secondaryCtaLink: '/contact',
    backgroundImage: '/hero-bg.jpg',
    overlayOpacity: 60,
    stats: [
      { icon: 'clock', value: '41', label: 'Years of Excellence' },
      { icon: 'users', value: '12', label: 'International Partners' },
      { icon: 'shield', value: '100+', label: 'Healthcare Facilities' },
      { icon: 'award', value: 'ISO', label: 'Certified Operations' },
    ],
  },
};

const categoriesContent = {
  page: 'home',
  section: 'categories',
  content: {
    title: 'Our Product Categories',
    titleHighlight: 'Categories',
    subtitle: 'Comprehensive Medical Solutions',
    description: 'Explore our wide range of medical equipment and solutions designed to meet the diverse needs of healthcare facilities.',
    categories: [
      {
        id: 'cancer-treatment',
        name: 'Cancer Treatment',
        slug: 'cancer-treatment',
        description: 'Advanced oncology equipment and cancer therapy systems',
        icon: 'Microscope',
      },
      {
        id: 'urology',
        name: 'Urology',
        slug: 'urology',
        description: 'Comprehensive urological treatment and diagnostic solutions',
        icon: 'Stethoscope',
      },
      {
        id: 'medical-imaging',
        name: 'Medical Imaging',
        slug: 'medical-imaging',
        description: 'State-of-the-art diagnostic imaging systems',
        icon: 'ScanLine',
      },
      {
        id: 'endoscopy',
        name: 'Endoscopy',
        slug: 'endoscopy',
        description: 'Advanced gastroscope and colonoscope systems for diagnostic and therapeutic procedures',
        icon: 'Activity',
      },
      {
        id: 'spinal-decompression',
        name: 'Spinal Decompression',
        slug: 'spinal-decompression',
        description: 'Advanced spinal decompression therapy systems and equipment',
        icon: 'Settings2',
      },
      {
        id: 'wound-care',
        name: 'Wound Care',
        slug: 'wound-care',
        description: 'Innovative wound care and management solutions',
        icon: 'Package',
      },
    ],
  },
};

async function seedContent() {
  try {
    await connectDB();
    console.log('Connected to database');

    // Drop the old collection if it exists (schema changed)
    try {
      await mongoose.connection.collection('contents').drop();
      console.log('Dropped old contents collection (schema changed)');
    } catch {
      // Collection might not exist, that's fine
      console.log('No existing collection to drop or already empty');
    }

    // Seed hero content
    await Content.findOneAndUpdate(
      { page: heroContent.page, section: heroContent.section },
      heroContent,
      { upsert: true, new: true }
    );
    console.log('✅ Hero content seeded successfully!');

    // Seed categories content
    await Content.findOneAndUpdate(
      { page: categoriesContent.page, section: categoriesContent.section },
      categoriesContent,
      { upsert: true, new: true }
    );
    console.log('✅ Categories content seeded successfully!');

    // Seed subcategories content
    const subcategoriesContent = {
      page: 'home',
      section: 'subcategories',
      content: {
        subcategories: [
          // Urology subcategories
          {
            id: 'urology-equipment',
            name: 'Equipments',
            slug: 'equipment',
            categoryId: 'urology',
            description: 'Advanced urological equipment and surgical systems',
            types: ['Lithotripsy', 'Surgical Lasers', 'Diagnostic Equipment'],
          },
          {
            id: 'urology-consumables',
            name: 'Consumables',
            slug: 'consumables',
            categoryId: 'urology',
            description: 'Urological disposables and consumable products',
            types: ['Ureteral Stents', 'Renal Transplant Stents', 'Surgical Supplies'],
          },
          // Cancer Treatment subcategories
          {
            id: 'cancer-treatment-systems',
            name: 'Treatment Systems',
            slug: 'treatment-systems',
            categoryId: 'cancer-treatment',
            description: 'Advanced cancer treatment and therapy systems',
            types: ['Bladder Cancer Treatment', 'Chemotherapy Systems', 'Radiotherapy'],
          },
          // Medical Imaging subcategories
          {
            id: 'medical-imaging-systems',
            name: 'Imaging Systems',
            slug: 'imaging-systems',
            categoryId: 'medical-imaging',
            description: 'Diagnostic imaging and scanning systems',
            types: ['MRI Systems', 'CT Scanners', 'X-Ray Equipment'],
          },
          // Endoscopy subcategories
          {
            id: 'gastroscopy',
            name: 'Gastroscopy',
            slug: 'gastroscopy',
            categoryId: 'endoscopy',
            description: 'Gastroscopes and colonoscopes for gastrointestinal procedures',
            types: ['Video Gastroscopes', 'Colonoscopy Systems', 'Endoscopy Accessories'],
          },
          {
            id: 'colonoscopy',
            name: 'Colonoscopy',
            slug: 'colonoscopy',
            categoryId: 'endoscopy',
            description: 'Colonoscopy systems and accessories for colorectal procedures',
            types: ['Video Colonoscopes', 'Colonoscopy Systems', 'Endoscopy Accessories'],
          },
          {
            id: 'endoscopy-imaging-systems',
            name: 'Imaging Systems',
            slug: 'imaging-systems',
            categoryId: 'endoscopy',
            description: 'Video processors and imaging systems for endoscopic procedures',
            types: ['Video Processors', 'Image Processing Systems', 'LED Light Sources'],
          },
          // Wound Care subcategories
          {
            id: 'infection-management',
            name: 'Infection Management',
            slug: 'infection-management',
            categoryId: 'wound-care',
            description: 'Infection control and management solutions',
            types: ['Antimicrobial Dressings', 'Wound Cleansing Products'],
          },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: subcategoriesContent.page, section: subcategoriesContent.section },
      subcategoriesContent,
      { upsert: true, new: true }
    );
    console.log('✅ Subcategories content seeded successfully!');

    // Seed about content
    const aboutContent = {
      page: 'home',
      section: 'about',
      content: {
        badge: 'About RIC',
        title: 'Pioneering Healthcare Excellence in',
        titleHighlight: 'Saudi Arabia',
        description: 'Riyadh International Corporation (RIC) has been at the forefront of medical equipment distribution since 1985. We are committed to advancing healthcare through innovative technologies and trusted partnerships.',
        secondaryDescription: 'Our mission is to inspire hope and improve quality of life by offering verifiable, effective professional solutions that ensure partner satisfaction. With ISO certification and SFDA approvals, we maintain the highest standards in everything we do.',
        ctaText: 'Learn More About Us',
        ctaLink: '/about',
        highlights: [
          'ISO Certified Operations',
          'SFDA Approved Products',
          '24/7 Technical Support',
          'Nationwide Coverage',
        ],
        features: [
          {
            icon: 'Building2',
            title: '41 Years of Trusted Service',
            description: 'Established in 1985, we bring decades of experience in medical equipment distribution and healthcare solutions.',
          },
          {
            icon: 'Users2',
            title: 'International Partnerships',
            description: 'Strategic partnerships with 12+ global leaders in medical technology ensure access to world-class equipment.',
          },
          {
            icon: 'Headphones',
            title: 'Comprehensive Support',
            description: 'From installation to maintenance, our dedicated team provides complete after-sales support.',
          },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: aboutContent.page, section: aboutContent.section },
      aboutContent,
      { upsert: true, new: true }
    );
    console.log('✅ About content seeded successfully!');

    // Seed vision-mission content
    const visionMissionContent = {
      page: 'home',
      section: 'vision-mission',
      content: {
        badge: 'Who We Are',
        title: 'Guided by Purpose',
        description: 'Our vision, mission, and values drive everything we do in healthcare excellence.',
        values: [
          {
            icon: 'Eye',
            title: 'Our Vision',
            description: "Keep pace with fast-moving technology for Saudi Arabia's 2030 vision to accomplish excellence in healthy living by offering complete medical solutions.",
            gradient: 'from-primary/10 to-primary/5',
            iconColor: 'text-primary',
          },
          {
            icon: 'Target',
            title: 'Our Mission',
            description: 'Inspire hope and improve quality of life by offering verifiable, effective professional solutions ensuring partner satisfaction.',
            gradient: 'from-accent/10 to-accent/5',
            iconColor: 'text-accent',
          },
          {
            icon: 'Heart',
            title: 'Our Values',
            description: 'Trust, loyalty, and respect — the constant fundamentals of our commitment to excellence in healthcare partnerships.',
            gradient: 'from-gold/10 to-gold/5',
            iconColor: 'text-gold',
          },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: visionMissionContent.page, section: visionMissionContent.section },
      visionMissionContent,
      { upsert: true, new: true }
    );
    console.log('✅ Vision-Mission content seeded successfully!');

    // ========================================
    // ABOUT PAGE CONTENT
    // ========================================

    // About Page - Hero Section
    const aboutHeroContent = {
      page: 'about',
      section: 'hero',
      content: {
        badge: 'About RIC',
        title: 'Pioneering',
        titleHighlight: 'Healthcare Excellence',
        titleSuffix: 'Since 1985',
        description: 'Riyadh International Corporation (RIC) has been at the forefront of medical equipment distribution in Saudi Arabia for over four decades, bringing world-class healthcare solutions to medical facilities nationwide.',
      },
    };

    await Content.findOneAndUpdate(
      { page: aboutHeroContent.page, section: aboutHeroContent.section },
      aboutHeroContent,
      { upsert: true, new: true }
    );
    console.log('✅ About Hero content seeded successfully!');

    // About Page - Stats Section
    const aboutStatsContent = {
      page: 'about',
      section: 'stats',
      content: {
        stats: [
          {
            number: '41+',
            label: 'Years of Excellence',
            description: 'Since 1985',
          },
          {
            number: '12+',
            label: 'Global Partners',
            description: 'Worldwide manufacturers',
          },
          {
            number: '6',
            label: 'Product Categories',
            description: 'Specialized solutions',
          },
          {
            number: '24/7',
            label: 'Support',
            description: 'Technical assistance',
          },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: aboutStatsContent.page, section: aboutStatsContent.section },
      aboutStatsContent,
      { upsert: true, new: true }
    );
    console.log('✅ About Stats content seeded successfully!');

    // About Page - Story Section
    const aboutStoryContent = {
      page: 'about',
      section: 'story',
      content: {
        badge: 'Our Story',
        title: 'Four Decades of Trusted Healthcare Solutions',
        paragraphs: [
          'Since our establishment in 1985, RIC has been dedicated to advancing healthcare in Saudi Arabia through innovative medical equipment and trusted partnerships with global manufacturers.',
          'We distribute world-class medical equipment across four specialized categories: Cancer Treatment, Urology, Medical Imaging, and Disposables. Our partnerships with leading international manufacturers ensure that healthcare facilities across Saudi Arabia have access to cutting-edge technology.',
          'With ISO certification and SFDA approval for all our products, we maintain the highest standards in quality, safety, and reliability. Our dedicated team provides comprehensive support from installation to ongoing maintenance, ensuring optimal performance of medical equipment.',
        ],
        highlights: [
          'ISO Certified Operations',
          'SFDA Approved Products',
          '24/7 Technical Support',
          'Nationwide Coverage',
        ],
        features: [
          {
            icon: 'Award',
            title: 'ISO Certified Operations',
            description: 'Maintaining international quality standards in all our processes and services.',
          },
          {
            icon: 'Shield',
            title: 'SFDA Approved Products',
            description: 'All our medical equipment meets Saudi FDA regulatory requirements.',
          },
          {
            icon: 'Headphones',
            title: 'Comprehensive Support',
            description: 'From installation to maintenance, our team provides complete technical support.',
          },
          {
            icon: 'TrendingUp',
            title: 'Continuous Innovation',
            description: 'Staying ahead with the latest medical technologies and healthcare solutions.',
          },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: aboutStoryContent.page, section: aboutStoryContent.section },
      aboutStoryContent,
      { upsert: true, new: true }
    );
    console.log('✅ About Story content seeded successfully!');

    // About Page - Values Section (Vision, Mission, Values)
    const aboutValuesContent = {
      page: 'about',
      section: 'values',
      content: {
        badge: 'Who We Are',
        title: 'Guided by Purpose',
        description: 'Our vision, mission, and values drive everything we do in healthcare excellence.',
        values: [
          {
            icon: 'Eye',
            title: 'Our Vision',
            description: "Keep pace with fast-moving technology for Saudi Arabia's 2030 vision to accomplish excellence in healthy living by offering complete medical solutions.",
            gradient: 'from-primary/10 to-primary/5',
            iconColor: 'text-primary',
          },
          {
            icon: 'Target',
            title: 'Our Mission',
            description: 'Inspire hope and improve quality of life by offering verifiable, effective professional solutions ensuring partner satisfaction.',
            gradient: 'from-accent/10 to-accent/5',
            iconColor: 'text-accent',
          },
          {
            icon: 'Heart',
            title: 'Our Values',
            description: 'Trust, loyalty, and respect — the constant fundamentals of our commitment to excellence in healthcare partnerships.',
            gradient: 'from-gold/10 to-gold/5',
            iconColor: 'text-gold',
          },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: aboutValuesContent.page, section: aboutValuesContent.section },
      aboutValuesContent,
      { upsert: true, new: true }
    );
    console.log('✅ About Values content seeded successfully!');

    // About Page - CTA Section
    const aboutCtaContent = {
      page: 'about',
      section: 'cta',
      content: {
        title: 'Partner with RIC for Healthcare Excellence',
        description: 'Discover how our medical equipment solutions can enhance your healthcare facility. Get in touch with our team today.',
        primaryCtaText: 'Contact Us',
        primaryCtaLink: '/contact',
        secondaryCtaText: 'View Products',
        secondaryCtaLink: '/#products',
      },
    };

    await Content.findOneAndUpdate(
      { page: aboutCtaContent.page, section: aboutCtaContent.section },
      aboutCtaContent,
      { upsert: true, new: true }
    );
    console.log('✅ About CTA content seeded successfully!');

    // =====================
    // CONTACT PAGE CONTENT
    // =====================

    // Contact Page - Hero Section
    const contactHeroContent = {
      page: 'contact',
      section: 'hero',
      content: {
        badge: 'Get In Touch',
        title: 'Contact',
        titleHighlight: 'RIC Medical Solutions',
        description: "Have questions about our medical equipment or healthcare solutions? We're here to help. Reach out to our team and we'll respond within 24 hours.",
      },
    };

    await Content.findOneAndUpdate(
      { page: contactHeroContent.page, section: contactHeroContent.section },
      contactHeroContent,
      { upsert: true, new: true }
    );
    console.log('✅ Contact Hero content seeded successfully!');

    // Contact Page - Contact Info Cards
    const contactInfoContent = {
      page: 'contact',
      section: 'info',
      content: {
        cards: [
          {
            id: 'visit',
            icon: 'MapPin',
            title: 'Visit Us',
            details: [
              'Kingdom of Saudi Arabia',
              'Riyadh, Orouba Street',
              'RIC Complex',
              'P.O. Box 223, Riyadh 2324',
            ],
            link: 'https://www.google.com/maps/place/RIYADH+INTERNATIONAL+CORPORATION/@24.7166169,46.680542,17z',
            color: 'text-primary',
          },
          {
            id: 'phone',
            icon: 'Phone',
            title: 'Call Us',
            details: ['+966 50 969 8043'],
            link: 'tel:+966509698043',
            color: 'text-gold',
          },
          {
            id: 'fax',
            icon: 'Printer',
            title: 'Fax',
            details: ['+966 11 463 0135'],
            link: null,
            color: 'text-accent',
          },
          {
            id: 'email',
            icon: 'Mail',
            title: 'Email Us',
            details: ['ricmede@ricmedical.com.sa'],
            link: 'mailto:ricmede@ricmedical.com.sa',
            color: 'text-primary',
          },
          {
            id: 'hours',
            icon: 'Clock',
            title: 'Working Hours',
            details: ['Sunday - Thursday', '8:00 AM - 5:00 PM'],
            link: null,
            color: 'text-gold',
          },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: contactInfoContent.page, section: contactInfoContent.section },
      contactInfoContent,
      { upsert: true, new: true }
    );
    console.log('✅ Contact Info content seeded successfully!');

    // Contact Page - Form Section
    const contactFormContent = {
      page: 'contact',
      section: 'form',
      content: {
        title: 'Send Us a Message',
        description: 'Fill out the form below and our team will get back to you as soon as possible.',
        submitButtonText: 'Send Message',
        successMessage: {
          title: 'Message sent successfully!',
          description: "We'll get back to you within 24 hours.",
        },
        fields: [
          { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
          { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
          { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+966 XX XXX XXXX', required: false },
          { id: 'company', label: 'Company/Organization', type: 'text', placeholder: 'Your Company Name', required: false },
          { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us about your inquiry...', required: true, rows: 6 },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: contactFormContent.page, section: contactFormContent.section },
      contactFormContent,
      { upsert: true, new: true }
    );
    console.log('✅ Contact Form content seeded successfully!');

    // Contact Page - Map Section
    const contactMapContent = {
      page: 'contact',
      section: 'map',
      content: {
        title: 'Visit Our Office',
        description: 'Located in the heart of Riyadh, our facility is easily accessible and equipped with the latest medical technology demonstrations.',
        address: {
          title: 'Address',
          companyName: 'Riyadh International Corporation Medical Equipments & Services, Ltd',
          street: 'Kingdom of Saudi Arabia, Riyadh, Orouba street, RIC Complex',
        },
        phone: {
          title: 'Phone',
          number: '+966 50 969 8043',
          link: 'tel:+966509698043',
        },
        embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.030488341401!2d46.68054207543805!3d24.716616850998157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03048c8ab6cd%3A0x37200af5e3ccaffc!2sRIYADH%20INTERNATIONAL%20CORPORATION!5e1!3m2!1sen!2ssa!4v1767512862403!5m2!1sen!2ssa',
        mapHeight: 450,
      },
    };

    await Content.findOneAndUpdate(
      { page: contactMapContent.page, section: contactMapContent.section },
      contactMapContent,
      { upsert: true, new: true }
    );
    console.log('✅ Contact Map content seeded successfully!');

    // Contact Page - CTA/Quick Info Banner
    const contactCtaContent = {
      page: 'contact',
      section: 'cta',
      content: {
        title: 'Need Immediate Assistance?',
        description: 'Our dedicated team is ready to help you with any inquiries about our medical equipment and healthcare solutions.',
        primaryCta: {
          text: 'Call Now',
          href: 'tel:+966509698043',
          icon: 'Phone',
        },
        secondaryCta: {
          text: 'Email Us',
          href: 'mailto:ricmede@ricmedical.com.sa',
          icon: 'Mail',
        },
      },
    };

    await Content.findOneAndUpdate(
      { page: contactCtaContent.page, section: contactCtaContent.section },
      contactCtaContent,
      { upsert: true, new: true }
    );
    console.log('✅ Contact CTA content seeded successfully!');

    // =====================
    // SERVICES PAGE CONTENT
    // =====================

    // Services Page - Hero Section
    const servicesHeroContent = {
      page: 'services',
      section: 'hero',
      content: {
        badge: 'Professional Service & Maintenance',
        badgeIcon: 'Wrench',
        title: 'Expert Medical Equipment',
        titleHighlight: 'Service & Maintenance',
        description: 'Comprehensive service solutions for all your medical equipment needs. From installation to ongoing maintenance, we ensure your devices operate at peak performance.',
        primaryCta: {
          text: 'Request Service',
          href: '/contact',
          icon: 'Phone',
        },
        secondaryCta: {
          text: '+966 11 465 4113',
          href: 'tel:+966114654113',
          icon: 'Phone',
        },
        stats: [
          { value: '24/7', label: 'Emergency Support', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
          { value: '100%', label: 'Genuine Parts', bgColor: 'bg-green-50', textColor: 'text-green-600' },
          { value: 'ISO', label: 'Certified Service', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
          { value: 'All', label: 'Major Brands', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: servicesHeroContent.page, section: servicesHeroContent.section },
      servicesHeroContent,
      { upsert: true, new: true }
    );
    console.log('✅ Services Hero content seeded successfully!');

    // Services Page - Partners Section
    const servicesPartnersContent = {
      page: 'services',
      section: 'partners',
      content: {
        title: 'Service & Maintenance Partners',
        description: 'We provide comprehensive service and maintenance solutions for all leading medical equipment brands, ensuring expert care for your critical devices.',
        // Partners are loaded from data.ts, but we can override the display settings here
        showTags: true,
        excludePartners: ['allwin', 'boston-scientific'],
      },
    };

    await Content.findOneAndUpdate(
      { page: servicesPartnersContent.page, section: servicesPartnersContent.section },
      servicesPartnersContent,
      { upsert: true, new: true }
    );
    console.log('✅ Services Partners content seeded successfully!');

    // Services Page - Offerings Section
    const servicesOfferingsContent = {
      page: 'services',
      section: 'offerings',
      content: {
        title: 'Our Service Offerings',
        description: 'Comprehensive maintenance and support services designed to keep your medical equipment running at optimal performance.',
        services: [
          {
            id: '1',
            icon: 'Settings',
            title: 'Preventive Maintenance',
            description: 'Scheduled maintenance programs to ensure optimal equipment performance and longevity. Regular inspections, calibrations, and part replacements to prevent unexpected downtime.',
            features: [
              'Scheduled equipment inspections',
              'Performance calibration',
              'Preventive part replacement',
              'Detailed maintenance reports',
            ],
          },
          {
            id: '2',
            icon: 'Wrench',
            title: 'Corrective Maintenance',
            description: 'Expert repair services for all medical equipment. Our certified technicians diagnose and resolve issues quickly to minimize disruption to your operations.',
            features: [
              '24/7 emergency support',
              'Rapid fault diagnosis',
              'Genuine spare parts',
              'Quality assurance testing',
            ],
          },
          {
            id: '3',
            icon: 'Zap',
            title: 'Installation & Commissioning',
            description: 'Professional installation and setup services ensuring your equipment is configured correctly from day one. Complete training for your staff included.',
            features: [
              'Site assessment & preparation',
              'Equipment installation',
              'System configuration',
              'Staff training programs',
            ],
          },
          {
            id: '4',
            icon: 'Award',
            title: 'Equipment Upgrades',
            description: 'Keep your medical equipment current with the latest software updates, hardware upgrades, and performance enhancements.',
            features: [
              'Software updates',
              'Hardware modernization',
              'Performance optimization',
              'Compliance certification',
            ],
          },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: servicesOfferingsContent.page, section: servicesOfferingsContent.section },
      servicesOfferingsContent,
      { upsert: true, new: true }
    );
    console.log('✅ Services Offerings content seeded successfully!');

    // Services Page - Why Choose Us Section
    const servicesWhyChooseContent = {
      page: 'services',
      section: 'why-choose',
      content: {
        title: 'Why Choose Our Services',
        description: 'Trusted by healthcare facilities across Saudi Arabia for reliable, professional medical equipment service and maintenance.',
        features: [
          {
            id: '1',
            icon: 'Users',
            title: 'Certified Technicians',
            description: 'Our team consists of factory-trained and certified technicians with extensive experience in medical equipment service and maintenance.',
          },
          {
            id: '2',
            icon: 'Shield',
            title: 'Authorized Service Provider',
            description: 'Official service partner for Dornier MedTech, Wikkon, and authorized to service all major medical equipment brands.',
          },
          {
            id: '3',
            icon: 'Clock',
            title: 'Rapid Response Time',
            description: 'We understand the critical nature of medical equipment. Our team provides quick response times to minimize downtime.',
          },
          {
            id: '4',
            icon: 'CheckCircle2',
            title: 'Genuine Parts Guarantee',
            description: 'All replacement parts are genuine OEM components, ensuring reliability, safety, and warranty compliance.',
          },
          {
            id: '5',
            icon: 'Headphones',
            title: 'Comprehensive Support',
            description: 'From installation to end-of-life, we provide complete lifecycle support including training, maintenance, and technical assistance.',
          },
          {
            id: '6',
            icon: 'FileText',
            title: 'SFDA Compliant',
            description: 'All our service procedures meet Saudi FDA standards and international quality management requirements.',
          },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: servicesWhyChooseContent.page, section: servicesWhyChooseContent.section },
      servicesWhyChooseContent,
      { upsert: true, new: true }
    );
    console.log('✅ Services Why Choose content seeded successfully!');

    // Services Page - Process Section
    const servicesProcessContent = {
      page: 'services',
      section: 'process',
      content: {
        title: 'Our Service Process',
        description: 'A streamlined, professional approach to ensure your equipment receives the best care with minimal disruption.',
        steps: [
          {
            step: '01',
            title: 'Service Request',
            description: 'Contact us via phone, email, or online form. Our support team will log your request and gather initial details.',
          },
          {
            step: '02',
            title: 'Assessment & Scheduling',
            description: 'Our technical team assesses the issue and schedules a visit at your convenience. Emergency services available 24/7.',
          },
          {
            step: '03',
            title: 'On-Site Service',
            description: 'Certified technician arrives with necessary tools and parts. Diagnoses issue and performs repair or maintenance.',
          },
          {
            step: '04',
            title: 'Quality Check & Documentation',
            description: 'Complete testing to ensure equipment meets performance standards. Detailed service report provided.',
          },
          {
            step: '05',
            title: 'Follow-up Support',
            description: 'Post-service support to ensure continued operation. Scheduled follow-ups for preventive maintenance.',
          },
        ],
      },
    };

    await Content.findOneAndUpdate(
      { page: servicesProcessContent.page, section: servicesProcessContent.section },
      servicesProcessContent,
      { upsert: true, new: true }
    );
    console.log('✅ Services Process content seeded successfully!');

    // Services Page - CTA Section
    const servicesCtaContent = {
      page: 'services',
      section: 'cta',
      content: {
        title: 'Need Service or Maintenance?',
        description: 'Our expert team is ready to help. Contact us today for immediate assistance or to schedule a service visit.',
        primaryCta: {
          text: 'Request Service',
          href: '/contact',
          icon: 'Mail',
        },
        secondaryCta: {
          text: '+966 11 465 4113',
          href: 'tel:+966114654113',
          icon: 'Phone',
        },
      },
    };

    await Content.findOneAndUpdate(
      { page: servicesCtaContent.page, section: servicesCtaContent.section },
      servicesCtaContent,
      { upsert: true, new: true }
    );
    console.log('✅ Services CTA content seeded successfully!');

    console.log('\n📦 All content seeded:');
    console.log('- Home Hero');
    console.log('- Home Categories');
    console.log('- Home Subcategories');
    console.log('- Home About');
    console.log('- Home Vision-Mission');
    console.log('- About Hero');
    console.log('- About Stats');
    console.log('- About Story');
    console.log('- About Values');
    console.log('- About CTA');
    console.log('- Contact Hero');
    console.log('- Contact Info');
    console.log('- Contact Form');
    console.log('- Contact Map');
    console.log('- Contact CTA');
    console.log('- Services Hero');
    console.log('- Services Partners');
    console.log('- Services Offerings');
    console.log('- Services Why Choose');
    console.log('- Services Process');
    console.log('- Services CTA');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding content:', error);
    process.exit(1);
  }
}

seedContent();
