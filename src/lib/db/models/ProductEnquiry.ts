import mongoose, { Schema, Document } from 'mongoose';

export interface IProductEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  productName: string;
  productSlug: string;
  category: string;
  partnerName?: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}

const ProductEnquirySchema = new Schema<IProductEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    message: { type: String },
    productName: { type: String, required: true },
    productSlug: { type: String, required: true },
    category: { type: String, required: true },
    partnerName: { type: String },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.models.ProductEnquiry ||
  mongoose.model<IProductEnquiry>('ProductEnquiry', ProductEnquirySchema);
