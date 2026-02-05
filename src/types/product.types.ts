/**
 * Standardized Product Type Definitions
 * Version: 1.0
 * Last Updated: January 18, 2026
 */

/**
 * Core Product Interface - All products must implement this base structure
 */
export interface StandardProduct {
  // ==================== REQUIRED CORE FIELDS ====================
  
  /** Unique identifier in kebab-case format */
  id: string;
  
  /** Official product display name */
  name: string;
  
  /** Brand or manufacturer name */
  brand: string;
  
  /** Reference to partner.id from partners array */
  partnerId: string;
  
  /** Reference to productCategories.id */
  category: string;
  
  /** Product type classification (e.g., "MRI Systems", "Surgical Lasers") */
  product_type: string;
  
  // ==================== OPTIONAL CORE FIELDS ====================
  
  /** Reference to productSubcategories.id */
  sub_category?: string | null;
  
  /** Indicates if product has variants (default: false) */
  is_parent_product?: boolean;
  
  // ==================== CONTENT FIELDS ====================
  
  /** Array of image URLs (minimum 1 required) */
  images: string[];
  
  /** Product overview and summary description */
  description: string;
  
  /** Array of product feature bullet points */
  features?: string[];
  
  // ==================== TECHNICAL & SPECIFICATION FIELDS ====================
  
  /** Flexible object for technical specifications */
  technical_specifications?: TechnicalSpecifications;
  
  /** Array of use cases and clinical applications */
  applications?: string[];
  
  /** Product variants (for parent products) */
  variants?: string[] | ProductVariant[];
  
  // ==================== CLINICAL & REGULATORY FIELDS ====================
  
  /** Regulatory certifications (CE, FDA, ISO, etc.) */
  certifications?: string[];
  
  /** Clinical advantages and benefits */
  clinical_benefits?: string[];
  
  /** Regulatory information */
  regulatory?: RegulatoryInfo;
  
  // ==================== COMPONENT & ACCESSORY FIELDS ====================
  
  /** System components and modules */
  system_components?: string[];
  
  /** Included accessories with the product */
  accessories_included?: string[];
  
  // ==================== ADVANTAGE FIELDS ====================
  
  /** Benefits specific to surgeons/physicians */
  advantages_for_surgeon?: string[];
  
  /** Benefits specific to patients */
  benefits_for_patient?: string[];
  
  // ==================== ADDITIONAL INFO ====================
  
  /** Additional product information */
  additional_info?: AdditionalInfo;
  
  // ==================== LEGACY/COMPATIBILITY FIELDS ====================
  
  /** Product combinations (mainly for stent products) */
  combinations?: Record<string, string>;
  
  /** Clinical references and citations */
  references?: string[];
  
  /** Mechanism of action (for therapy devices) */
  mechanism_of_action?: string;
  
  /** Distributor information */
  distributor?: DistributorInfo;
  
  /** Manufacturer information */
  manufacturer?: ManufacturerInfo;
  
  /** Support contact information */
  support_contact?: SupportContact;
  
  // ==================== DISPLAY FLAGS ====================
  
  /** Flag for image display preference */
  show_image_main?: boolean;
}

/**
 * Technical Specifications - Flexible structure for product specs
 */
export interface TechnicalSpecifications {
  // Common fields
  max_power_watts?: number;
  wavelength_nm?: number;
  magnetic_field_tesla?: number;
  cooling_system?: string;
  
  // Imaging specs
  field_of_view?: string | number;
  resolution?: string;
  
  // System specs
  weight_lbs?: number;
  dimensions?: {
    length_in?: number;
    width_in?: number;
    height_in?: number;
  };
  
  // Allow any additional technical fields
  [key: string]: any;
}

/**
 * Product Variant - For products with multiple versions
 */
export interface ProductVariant {
  id: string;
  name: string;
  specifications?: Record<string, any>;
  images?: string[];
  description?: string;
}

/**
 * Regulatory Information
 */
export interface RegulatoryInfo {
  fda_classification?: string;
  intended_use?: string;
  clearances?: string[];
  [key: string]: any;
}

/**
 * Additional Product Information
 */
export interface AdditionalInfo {
  source_url?: string;
  contact_phone?: string;
  contact_email?: string;
  company_email?: string;
  company_location?: string;
  place_of_origin?: string;
  minimum_order_quantity?: string;
  delivery_time_days?: string | number;
  price?: string;
  packaging_details?: string;
  payment_terms?: string[];
  supply_ability?: string;
  model_number?: string;
  [key: string]: any;
}

/**
 * Distributor Information
 */
export interface DistributorInfo {
  name?: string;
  region?: string;
  contact?: string;
  website?: string;
  [key: string]: any;
}

/**
 * Manufacturer Information
 */
export interface ManufacturerInfo {
  name?: string;
  headquarters?: string;
  established?: string;
  specialty?: string;
  [key: string]: any;
}

/**
 * Support Contact Information
 */
export interface SupportContact {
  phone?: string;
  email?: string;
  [key: string]: any;
}

/**
 * Product Filter Options
 */
export interface ProductFilters {
  category?: string;
  sub_category?: string;
  partnerId?: string;
  product_type?: string;
  is_parent_product?: boolean;
  search?: string;
}

/**
 * Product Sort Options
 */
export type ProductSortField = 'name' | 'brand' | 'category' | 'product_type' | 'created_at';
export type SortOrder = 'asc' | 'desc';

export interface ProductSort {
  field: ProductSortField;
  order: SortOrder;
}

/**
 * Product Pagination
 */
export interface ProductPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

/**
 * Product List Response
 */
export interface ProductListResponse {
  products: StandardProduct[];
  pagination: ProductPagination;
  filters?: {
    categories: string[];
    partners: string[];
    product_types: string[];
  };
}

/**
 * Product Validation Result
 */
export interface ProductValidationResult {
  isValid: boolean;
  errors: ProductValidationError[];
  warnings: ProductValidationWarning[];
}

export interface ProductValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ProductValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

/**
 * Type guard to check if a product is valid
 */
export function isStandardProduct(product: any): product is StandardProduct {
  const requiredFields = [
    'id',
    'name',
    'brand',
    'partnerId',
    'category',
    'product_type',
    'images',
    'description'
  ];
  
  return requiredFields.every(field => {
    const value = product[field];
    if (field === 'images') {
      return Array.isArray(value) && value.length > 0;
    }
    return value !== undefined && value !== null && value !== '';
  });
}

/**
 * Product Creation Input (for API)
 */
export type CreateProductInput = Omit<StandardProduct, 'id'> & {
  id?: string; // Optional for auto-generation
};

/**
 * Product Update Input (for API)
 */
export type UpdateProductInput = Partial<StandardProduct> & {
  id: string; // Required for updates
};
