import mongoose, { Schema, Document } from 'mongoose';
import OriginalSourceSchema from './OriginalSource.model';
import { IMemeProfile } from '../types';

const MemeProfileSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keyPhrases: { type: String, required: true },
    originalSources: { type: [OriginalSourceSchema], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMemeProfile>('MemeProfile', MemeProfileSchema);
