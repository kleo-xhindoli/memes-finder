import Meme from '../models/Meme.model';
import { IMeme, MemeInput, MemeResponse } from '../types';
import BaseEntity from './base/BaseEntity';

const base = BaseEntity(Meme);

export default {
  ...base,

  async create(meme: MemeInput): Promise<IMeme> {
    return base.create(meme);
  },

  toResponseObject(meme: IMeme): MemeResponse {
    return base.toResponseObject(meme) as MemeResponse;
  },
};
