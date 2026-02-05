/**
 * Product Data Migration/Standardization Script
 * This script helps migrate existing products to the standard schema
 * 
 * Usage:
 *   node scripts/migrateProducts.js
 */

import fs from 'fs';
import path from 'path';
import { products } from '../src/lib/data';
import { validateProduct } from '../src/lib/productValidation';
import type { StandardProduct } from '../src/types/product.types';

/**
 * Migrates a single product to standard schema
 */
function migrateProduct(product: any): StandardProduct {
  const migrated: any = {
    // Required fields
    id: product.id,
    name: product.name,
    brand: product.brand,
    partnerId: product.partnerId || generatePartnerId(product.brand),
    category: product.category,
    product_type: product.product_type || product.type || 'Unknown',
    
    // Ensure images is an array
    images: Array.isArray(product.images)
      ? product.images
      : product.image
      ? [product.image]
      : [],
    
    description: product.description || product.desc || '',
    
    // Optional core fields
    sub_category: product.sub_category || null,
    is_parent_product: product.is_parent_product || false,
  };

  // Copy array fields if they exist
  const arrayFields = [
    'features',
    'applications',
    'variants',
    'certifications',
    'clinical_benefits',
    'system_components',
    'accessories_included',
    'advantages_for_surgeon',
    'benefits_for_patient',
    'references',
  ];

  arrayFields.forEach((field) => {
    if (product[field]) {
      migrated[field] = Array.isArray(product[field])
        ? product[field]
        : [product[field]];
    }
  });

  // Copy object fields if they exist
  if (product.technical_specifications || product.specs) {
    migrated.technical_specifications =
      product.technical_specifications || product.specs;
  }

  if (product.regulatory) {
    migrated.regulatory = product.regulatory;
  }

  // Consolidate additional info
  migrated.additional_info = {
    ...(product.additional_info || {}),
    ...(extractContactInfo(product)),
    ...(extractDeliveryInfo(product)),
  };

  // Copy legacy fields
  if (product.combinations) migrated.combinations = product.combinations;
  if (product.mechanism_of_action) migrated.mechanism_of_action = product.mechanism_of_action;
  if (product.distributor) migrated.distributor = product.distributor;
  if (product.manufacturer) migrated.manufacturer = product.manufacturer;
  if (product.support_contact) migrated.support_contact = product.support_contact;
  
  // Copy display flags
  if (product.show_image_main !== undefined) {
    migrated.show_image_main = product.show_image_main;
  }

  return migrated;
}

/**
 * Generate partnerId from brand name
 */
function generatePartnerId(brand: string): string {
  if (!brand) return 'unknown';
  return brand
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extract contact info to consolidate in additional_info
 */
function extractContactInfo(product: any): Record<string, any> {
  const info: Record<string, any> = {};

  // Check various contact field locations
  if (product.contact_phone) info.contact_phone = product.contact_phone;
  if (product.contact_email) info.contact_email = product.contact_email;
  if (product.company_email) info.company_email = product.company_email;
  if (product.company_location) info.company_location = product.company_location;

  // Check manufacturer object
  if (product.manufacturer) {
    if (product.manufacturer.headquarters) {
      info.company_location = product.manufacturer.headquarters;
    }
  }

  // Check support_contact object
  if (product.support_contact) {
    if (product.support_contact.phone) info.contact_phone = product.support_contact.phone;
    if (product.support_contact.email) info.contact_email = product.support_contact.email;
  }

  return info;
}

/**
 * Extract delivery/origin info
 */
function extractDeliveryInfo(product: any): Record<string, any> {
  const info: Record<string, any> = {};

  if (product.place_of_origin) info.place_of_origin = product.place_of_origin;
  if (product.delivery_time_days) info.delivery_time_days = product.delivery_time_days;
  if (product.minimum_order_quantity) info.minimum_order_quantity = product.minimum_order_quantity;
  if (product.packaging_details) info.packaging_details = product.packaging_details;
  if (product.payment_terms) info.payment_terms = product.payment_terms;
  if (product.supply_ability) info.supply_ability = product.supply_ability;
  if (product.model_number) info.model_number = product.model_number;
  if (product.price) info.price = product.price;

  return info;
}

/**
 * Main migration function
 */
function migrateAllProducts() {
  console.log('🔄 Starting product migration...\n');

  const migratedProducts: StandardProduct[] = [];
  const migrationReport: {
    total: number;
    migrated: number;
    errors: Array<{ id: string; error: string }>;
    warnings: Array<{ id: string; warning: string }>;
  } = {
    total: products.length,
    migrated: 0,
    errors: [],
    warnings: [],
  };

  products.forEach((product) => {
    try {
      const migrated = migrateProduct(product);
      const validation = validateProduct(migrated);

      if (validation.isValid) {
        migratedProducts.push(migrated);
        migrationReport.migrated++;

        if (validation.warnings.length > 0) {
          migrationReport.warnings.push({
            id: migrated.id,
            warning: `${validation.warnings.length} warning(s)`,
          });
        }
      } else {
        migrationReport.errors.push({
          id: product.id || 'unknown',
          error: validation.errors.map((e) => e.message).join(', '),
        });
      }
    } catch (error) {
      migrationReport.errors.push({
        id: product.id || 'unknown',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  // Print report
  console.log('========================================');
  console.log('Migration Report');
  console.log('========================================\n');
  console.log(`Total Products: ${migrationReport.total}`);
  console.log(`✅ Successfully Migrated: ${migrationReport.migrated}`);
  console.log(`❌ Failed: ${migrationReport.errors.length}`);
  console.log(`⚠️  Warnings: ${migrationReport.warnings.length}\n`);

  if (migrationReport.errors.length > 0) {
    console.log('Errors:');
    migrationReport.errors.forEach((err) => {
      console.log(`  - ${err.id}: ${err.error}`);
    });
    console.log('');
  }

  if (migrationReport.warnings.length > 0) {
    console.log('Warnings:');
    migrationReport.warnings.forEach((warn) => {
      console.log(`  - ${warn.id}: ${warn.warning}`);
    });
    console.log('');
  }

  // Write migrated products to file
  const outputPath = path.join(process.cwd(), 'src', 'lib', 'data.migrated.ts');
  const output = `/**
 * Migrated Products Data
 * Auto-generated on ${new Date().toISOString()}
 * 
 * This file contains products migrated to the standard schema.
 * Review and replace the original data.ts after verification.
 */

import type { StandardProduct } from '@/types/product.types';

export const products: StandardProduct[] = ${JSON.stringify(migratedProducts, null, 2)};
`;

  fs.writeFileSync(outputPath, output, 'utf-8');
  console.log(`✅ Migrated data written to: ${outputPath}\n`);
  console.log('Next steps:');
  console.log('1. Review the migrated data file');
  console.log('2. Fix any errors or warnings');
  console.log('3. Replace src/lib/data.ts with migrated data');
  console.log('4. Run validation: npm run validate:products\n');

  return migrationReport;
}

// Run migration
migrateAllProducts();
