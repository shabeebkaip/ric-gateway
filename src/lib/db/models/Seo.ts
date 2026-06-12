import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISeo extends Document {
  key: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const SeoSchema = new Schema<ISeo>(
  {
    key: { type: String, default: 'global', unique: true },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const Seo: Model<ISeo> =
  mongoose.models.Seo || mongoose.model<ISeo>('Seo', SeoSchema);

export default Seo;
