import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  slug: string;
  logo: string;
  description?: string;
  website?: string;
  country?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: {
      type: String,
      required: [true, 'Partner name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    logo: {
      type: String,
      required: [true, 'Logo is required'],
    },
    description: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
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

const Partner: Model<IPartner> = mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema);

export default Partner;
