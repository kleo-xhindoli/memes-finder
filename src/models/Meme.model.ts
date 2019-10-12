import mongoose, { Schema, Document } from 'mongoose';
import OriginalSourceSchema from './OriginalSource.model';
import { IMeme } from '../types';

const MemeSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keyPhrases: { type: [String], default: [] },
    sourceUrls: {
      video: { type: String },
      image: { type: String },
      thumbnail: { type: String },
    },
    participants: { type: [String], default: [] },
    originalSources: { type: [OriginalSourceSchema], default: [] },
    lang: { type: String, enum: ['en', 'al'] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

MemeSchema.index(
  {
    title: 'text',
    description: 'text',
    keyPhrases: 'text',
  },
  {
    weights: {
      title: 10,
      description: 5,
      keyPhrases: 2,
    },
  }
);

export default mongoose.model<IMeme>('Meme', MemeSchema);
