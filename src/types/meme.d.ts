import { Document } from 'mongoose';
import { IUser } from './user';
import { MemeProfile } from './memeProfile';
import { OriginalSource } from './originalSource';
import { isMemberExpression } from '@babel/types';

interface Meme extends Document {
  _id: string;
  title: string;
  description: string;
  keyPhrases: string[];
  sourceUrls: {
    video?: string;
    image?: string;
    thumbnail?: string;
  };
  participants?: string[];
  originalSources: OriginalSource[];
  lang: 'al' | 'en';
  createdBy: IUser;
  updatedBy: IUser;
  createdAt: Date;
  updatedAt: Date;
  // TODO: implement
  // _links: {
  //   related: Meme[];
  //   profile: MemeProfile;
  // };
}

export type MemeInput = Pick<
  Meme,
  | 'title'
  | 'description'
  | 'keyPhrases'
  | 'sourceUrls'
  | 'participants'
  | 'originalSources'
  | 'lang'
>;

type IMeme = Meme & Document;
export type MemeResponse = Meme;
