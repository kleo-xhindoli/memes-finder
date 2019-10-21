import Meme from '../models/Meme.model';
import { IMeme, MemeInput, MemeResponse, PaginatedResponse } from '../types';
import BaseEntity from './base/BaseEntity';

const base = BaseEntity(Meme);

export default {
  ...base,

  async create(meme: MemeInput): Promise<IMeme> {
    return base.create(meme);
  },

  async search(
    term: string,
    size = 20,
    page = 0
  ): Promise<PaginatedResponse<MemeResponse>> {
    return new Promise((resolve, reject) => {
      const skip = size * page;

      const filterConditions = {
        $text: { $search: term },
      };

      Meme.find(filterConditions, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(size)
        .exec((err, docs) => {
          if (err) return reject(err);
          Meme.countDocuments(filterConditions, (err, total) => {
            if (err) return reject(err);
            resolve({
              data: docs,
              meta: {
                size,
                page,
                total,
              },
            });
          });
        });
    });
  },

  toResponseObject(meme: IMeme): MemeResponse {
    return base.toResponseObject(meme) as MemeResponse;
  },
};
