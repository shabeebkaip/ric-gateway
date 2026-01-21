import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContent extends Document {
  page: string;
  section: string;
  content: Record<string, unknown>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    page: {
      type: String,
      required: [true, 'Page is required'],
      trim: true,
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      trim: true,
    },
    content: {
      type: Schema.Types.Mixed,
      default: {},
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

// Compound unique index for page + section
ContentSchema.index({ page: 1, section: 1 }, { unique: true });

// Delete the cached model if it exists with old schema
if (mongoose.models.Content) {
  delete mongoose.models.Content;
}

const Content: Model<IContent> = mongoose.model<IContent>('Content', ContentSchema);

export default Content;
