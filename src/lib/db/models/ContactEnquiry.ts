import mongoose, { Schema, Document } from 'mongoose';

export interface IContactEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}

const ContactEnquirySchema = new Schema<IContactEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.models.ContactEnquiry ||
  mongoose.model<IContactEnquiry>('ContactEnquiry', ContactEnquirySchema);
