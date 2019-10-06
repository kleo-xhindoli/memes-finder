import { Document } from 'mongoose';
import { OriginalSource } from './originalSource';
import { User } from './user';
import { Meme } from './meme';

interface MemeProfile {
  _id: string;
  title: string;
  description: string;
  keyPhrases: string;
  originalSources: OriginalSource[];
  createdBy: User;
  createdAt: Date;
  updatedBy: User;
  updatedAt: Date;
}

type IMemeProfile = MemeProfile & Document;

export type MemeProfileInput = Pick<
  MemeProfile,
  'title' | 'description' | 'keyPhrases' | 'originalSources'
>;

export type MemeProfileResponse = MemeProfile;
