import { Document } from 'mongoose';

interface OriginalSource extends Document {
  name: string;
  url: string;
}

export type OriginalSourceInput = Pick<OriginalSource, 'name' | 'url'>;

export type OriginalSourceResponse = Pick<OriginalSource, 'name' | 'url'>;
