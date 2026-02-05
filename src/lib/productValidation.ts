/**
 * Product Validation Utilities
 * Version: 1.0
 * Last Updated: January 18, 2026
 */

import type {
  StandardProduct,
  ProductValidationResult,
  ProductValidationError,
  ProductValidationWarning,
} from '@/types/product.types';

/**
 * Required fields for all products
 */
const REQUIRED_FIELDS = [
  'id',
  'name',
  'brand',
  'partnerId',
  'category',
  'product_type',
  'images',
  'description',
] as const;

/**
 * Fields that should be arrays
 */
const ARRAY_FIELDS = [
  'images',
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
] as const;

/**
 * Fields that should be objects
 */
const OBJECT_FIELDS = [
  'technical_specifications',
  'regulatory',
  'additional_info',
  'distributor',
  'manufacturer',
  'support_contact',
  'combinations',
] as const;

/**
 * Validates a product against the standard schema
 */
export function validateProduct(product: any): ProductValidationResult {
  const errors: ProductValidationError[] = [];
  const warnings: ProductValidationWarning[] = [];

  // Check required fields
  REQUIRED_FIELDS.forEach((field) => {
    const value = product[field];

    if (value === undefined || value === null) {
      errors.push({
        field,
        message: `Required field '${field}' is missing`,
      });
    } else if (typeof value === 'string' && value.trim() === '') {
      errors.push({
        field,
        message: `Required field '${field}' is empty`,
        value,
      });
    } else if (field === 'images') {
      if (!Array.isArray(value)) {
        errors.push({
          field,
          message: `Field 'images' must be an array`,
          value,
        });
      } else if (value.length === 0) {
        errors.push({
          field,
          message: `Field 'images' must contain at least one image URL`,
          value,
        });
      }
    }
  });

  // Validate ID format (kebab-case)
  if (product.id && typeof product.id === 'string') {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(product.id)) {
      warnings.push({
        field: 'id',
        message: 'ID should be in kebab-case format (lowercase, hyphen-separated)',
        suggestion: product.id.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      });
    }
  }

  // Validate array fields
  ARRAY_FIELDS.forEach((field) => {
    const value = product[field];
    if (value !== undefined && value !== null && !Array.isArray(value)) {
      errors.push({
        field,
        message: `Field '${field}' must be an array`,
        value,
      });
    }
  });

  // Validate object fields
  OBJECT_FIELDS.forEach((field) => {
    const value = product[field];
    if (
      value !== undefined &&
      value !== null &&
      (typeof value !== 'object' || Array.isArray(value))
    ) {
      errors.push({
        field,
        message: `Field '${field}' must be an object`,
        value,
      });
    }
  });

  // Validate boolean fields
  if (
    product.is_parent_product !== undefined &&
    typeof product.is_parent_product !== 'boolean'
  ) {
    errors.push({
      field: 'is_parent_product',
      message: "Field 'is_parent_product' must be a boolean",
      value: product.is_parent_product,
    });
  }

  if (
    product.show_image_main !== undefined &&
    typeof product.show_image_main !== 'boolean'
  ) {
    errors.push({
      field: 'show_image_main',
      message: "Field 'show_image_main' must be a boolean",
      value: product.show_image_main,
    });
  }

  // Check for parent products with variants
  if (product.is_parent_product === true) {
    if (!product.variants || !Array.isArray(product.variants) || product.variants.length === 0) {
      warnings.push({
        field: 'variants',
        message: 'Parent products should have variants array',
        suggestion: 'Add variants array or set is_parent_product to false',
      });
    }
  }

  // Validate image URLs
  if (Array.isArray(product.images)) {
    product.images.forEach((img: any, index: number) => {
      if (typeof img !== 'string') {
        errors.push({
          field: `images[${index}]`,
          message: 'Image URL must be a string',
          value: img,
        });
      } else if (!img.startsWith('http') && !img.startsWith('/')) {
        warnings.push({
          field: `images[${index}]`,
          message: 'Image URL should start with http(s):// or /',
          suggestion: 'Use absolute URLs or paths starting with /',
        });
      }
    });
  }

  // Check for recommended fields
  if (!product.features || product.features.length === 0) {
    warnings.push({
      field: 'features',
      message: 'Product should have features array for better presentation',
      suggestion: 'Add product features as bullet points',
    });
  }

  if (!product.technical_specifications) {
    warnings.push({
      field: 'technical_specifications',
      message: 'Technical specifications recommended for complete product data',
      suggestion: 'Add technical_specifications object',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates multiple products
 */
export function validateProducts(products: any[]): Map<string, ProductValidationResult> {
  const results = new Map<string, ProductValidationResult>();

  products.forEach((product) => {
    const result = validateProduct(product);
    results.set(product.id || 'unknown', result);
  });

  return results;
}

/**
 * Gets summary of validation results
 */
export function getValidationSummary(results: Map<string, ProductValidationResult>) {
  let totalProducts = 0;
  let validProducts = 0;
  let totalErrors = 0;
  let totalWarnings = 0;

  results.forEach((result) => {
    totalProducts++;
    if (result.isValid) validProducts++;
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  });

  return {
    totalProducts,
    validProducts,
    invalidProducts: totalProducts - validProducts,
    totalErrors,
    totalWarnings,
    validationRate: totalProducts > 0 ? (validProducts / totalProducts) * 100 : 0,
  };
}

/**
 * Prints validation report to console
 */
export function printValidationReport(results: Map<string, ProductValidationResult>) {
  const summary = getValidationSummary(results);

  console.log('\n========================================');
  console.log('Product Validation Report');
  console.log('========================================\n');

  console.log(`Total Products: ${summary.totalProducts}`);
  console.log(`✅ Valid Products: ${summary.validProducts}`);
  console.log(`❌ Invalid Products: ${summary.invalidProducts}`);
  console.log(`Validation Rate: ${summary.validationRate.toFixed(2)}%`);
  console.log(`Total Errors: ${summary.totalErrors}`);
  console.log(`Total Warnings: ${summary.totalWarnings}\n`);

  // Print invalid products
  if (summary.invalidProducts > 0) {
    console.log('========================================');
    console.log('Invalid Products:');
    console.log('========================================\n');

    results.forEach((result, productId) => {
      if (!result.isValid) {
        console.log(`Product ID: ${productId}`);
        
        if (result.errors.length > 0) {
          console.log('  Errors:');
          result.errors.forEach((error) => {
            console.log(`    - ${error.field}: ${error.message}`);
            if (error.value !== undefined) {
              console.log(`      Current value: ${JSON.stringify(error.value)}`);
            }
          });
        }

        if (result.warnings.length > 0) {
          console.log('  Warnings:');
          result.warnings.forEach((warning) => {
            console.log(`    - ${warning.field}: ${warning.message}`);
            if (warning.suggestion) {
              console.log(`      Suggestion: ${warning.suggestion}`);
            }
          });
        }
        console.log('');
      }
    });
  }

  // Print products with warnings
  const productsWithWarnings = Array.from(results.entries()).filter(
    ([_, result]) => result.isValid && result.warnings.length > 0
  );

  if (productsWithWarnings.length > 0) {
    console.log('========================================');
    console.log('Valid Products with Warnings:');
    console.log('========================================\n');

    productsWithWarnings.forEach(([productId, result]) => {
      console.log(`Product ID: ${productId}`);
      console.log('  Warnings:');
      result.warnings.forEach((warning) => {
        console.log(`    - ${warning.field}: ${warning.message}`);
        if (warning.suggestion) {
          console.log(`      Suggestion: ${warning.suggestion}`);
        }
      });
      console.log('');
    });
  }

  console.log('========================================\n');
}

/**
 * Generates a standardized product template
 */
export function generateProductTemplate(): Partial<StandardProduct> {
  return {
    id: 'brand-product-name',
    name: 'Product Name',
    brand: 'Brand Name',
    partnerId: 'partner-id',
    category: 'category-id',
    sub_category: 'subcategory-id',
    product_type: 'Product Type',
    is_parent_product: false,
    images: ['https://example.com/image.jpg'],
    description: 'Product description goes here...',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
    technical_specifications: {
      // Add technical specs here
    },
    applications: [
      'Application 1',
      'Application 2',
    ],
    certifications: ['CE', 'FDA'],
    additional_info: {
      source_url: 'https://example.com',
      contact_email: 'info@example.com',
    },
  };
}

/**
 * Sanitizes product data by removing undefined/null values
 */
export function sanitizeProduct(product: any): StandardProduct {
  const sanitized: any = {};

  Object.keys(product).forEach((key) => {
    const value = product[key];
    
    // Skip undefined and null values
    if (value === undefined || value === null) {
      return;
    }

    // Skip empty strings
    if (typeof value === 'string' && value.trim() === '') {
      return;
    }

    // Skip empty arrays
    if (Array.isArray(value) && value.length === 0) {
      return;
    }

    // Skip empty objects
    if (
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0
    ) {
      return;
    }

    sanitized[key] = value;
  });

  return sanitized as StandardProduct;
}
