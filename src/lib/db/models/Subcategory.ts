import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubcategory extends Document {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  types: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubcategorySchema = new Schema<ISubcategory>(
  {
    id: {
      type: String,
      required: [true, 'Subcategory id is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Subcategory name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      lowercase: true,
      trim: true,
    },
    categoryId: {
      type: String,
      required: [true, 'categoryId is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    types: [
      {
        type: String,
        trim: true,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: slug must be unique within a category
SubcategorySchema.index({ categoryId: 1, slug: 1 }, { unique: true });

const Subcategory: Model<ISubcategory> =
  mongoose.models.Subcategory ||
  mongoose.model<ISubcategory>('Subcategory', SubcategorySchema);

export default Subcategory;
