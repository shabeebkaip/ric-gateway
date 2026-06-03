import mongoose, { Schema, Document, Model } from 'mongoose';
import { BLOG_CATEGORIES, type BlogCategory } from '@/lib/blogUtils';

export type { BlogCategory };
export { BLOG_CATEGORIES } from '@/lib/blogUtils';
export { BLOG_CATEGORY_LABELS, BLOG_CATEGORY_COLORS } from '@/lib/blogUtils';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: BlogCategory;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt: Date;
  readTime: number;
  metaTitle?: string;
  metaDescription?: string;
  relatedProducts: string[];
  relatedPosts: string[];
  views: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true,
      maxlength: [320, 'Excerpt must be 320 characters or less'],
    },
    content: { type: String, required: [true, 'Content is required'] },
    coverImage: { type: String, default: '' },
    category: {
      type: String,
      enum: BLOG_CATEGORIES,
      required: [true, 'Category is required'],
    },
    tags: [{ type: String, trim: true, lowercase: true }],
    author: {
      name: { type: String, required: true, trim: true },
      role: { type: String, trim: true, default: '' },
      avatar: { type: String },
    },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    readTime: { type: Number, default: 1, min: 1 },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    relatedProducts: [{ type: String }],
    relatedPosts: [{ type: String }],
    views: { type: Number, default: 0, min: 0 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-set publishedAt and calculate readTime before saving
BlogPostSchema.pre('save', async function () {
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  if (this.isModified('content') && this.content) {
    const wordCount = this.content
      .replace(/<[^>]*>/g, '')
      .split(/\s+/)
      .filter(Boolean).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }
});

BlogPostSchema.index({ category: 1, isPublished: 1 });
BlogPostSchema.index({ isFeatured: 1, isPublished: 1 });
BlogPostSchema.index({ publishedAt: -1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ title: 'text', excerpt: 'text' });

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
