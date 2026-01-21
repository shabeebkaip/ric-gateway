import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  subcategory?: string;
  partner: string;
  type?: string;
  images: string[];
  thumbnail?: string;
  isPremium: boolean;
  isFeatured: boolean;
  isActive: boolean;
  
  // Dynamic fields that vary per product
  specifications: Record<string, any>;
  features?: string[];
  technicalData?: Record<string, any>;
  additionalInfo?: Record<string, any>;
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  
  // Ordering
  order: number;
  
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    partner: {
      type: String,
      required: [true, 'Partner is required'],
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    images: [{
      type: String,
    }],
    thumbnail: {
      type: String,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    specifications: {
      type: Schema.Types.Mixed,
      default: {},
    },
    features: [{
      type: String,
      trim: true,
    }],
    technicalData: {
      type: Schema.Types.Mixed,
      default: {},
    },
    additionalInfo: {
      type: Schema.Types.Mixed,
      default: {},
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
ProductSchema.index({ title: 'text', description: 'text' });
ProductSchema.index({ category: 1, subcategory: 1, partner: 1 });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
