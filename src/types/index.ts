// Product Types
export interface Product {
  id: string;
  name: string;
  brand: string;
  partnerId?: string;
  category: string;
  sub_category?: string;
  product_type: string;
  description?: string;
  images?: string[];
  is_parent_product?: boolean;
  variants?: string[] | Record<string, any>[];
  features?: string[];
  applications?: string[];
  technical_specifications?: any;
  certifications?: string[];
  regulatory?: any;
  distributor?: any;
  key_benefits?: string[];
  system_components?: string[];
  safety_features?: string[];
  clinical_indications?: string[];
  key_features?: string[];
  full_name?: string;
  combinations?: any;
  show_image_main?: boolean;
  accessories_included?: string[];
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  types: string[];
}

// Component Props Types
export interface ProductListContentProps {
  category: Category;
  products: Product[];
  subcategories?: Subcategory[];
}

export interface ProductDetailContentProps {
  product: Product;
  category: Category;
}

export interface ProductHeroProps {
  product: Product;
  category: Category;
}

export interface ProductVariantsProps {
  variants: string[] | Record<string, any>[];
}

export interface ProductInfoCardsProps {
  features?: string[];
  applications?: string[];
  key_benefits?: string[];
  certifications?: string[];
  regulatory?: any;
}

export interface TechnicalSpecificationsProps {
  specifications: any;
}

export interface ProductCTAProps {
  productName: string;
  categoryName: string;
  categorySlug: string;
}

export interface CategoryHeroProps {
  category: Category;
  productCount: number;
  subcategoryCount: number;
}

export interface ProductFiltersProps {
  subcategories: Subcategory[];
  availableBrands: string[];
  selectedSubcategory: string | null;
  selectedBrands: string[];
  showFilters: boolean;
  filteredProductCount: number;
  searchQuery: string;
  onSubcategoryChange: (subcategoryId: string | null) => void;
  onBrandToggle: (brand: string) => void;
  onClearFilters: () => void;
  onToggleFilters: () => void;
  onSearchChange: (query: string) => void;
}

export interface ProductCardProps {
  product: Product;
  category: Category;
  index: number;
}

export interface ProductGridProps {
  products: Product[];
  category: Category;
  subcategories: Subcategory[];
  hasSubcategories: boolean;
  groupedProducts: Record<
    string,
    { subcategory: Subcategory; products: Product[] }
  > | null;
  ungroupedProducts: Product[];
}

export interface EmptyStateProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

// Content Editor Types
export interface PageHeroContent {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
}

export interface PageHeroEditorProps {
  page: string;
  section: string;
  pageTitle: string;
  pageBreadcrumb: string;
  previewUrl: string;
  defaultContent: PageHeroContent;
}
