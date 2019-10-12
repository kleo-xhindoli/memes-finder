import { Model, Document } from 'mongoose';
import { PaginatedResponse } from '../../types';

export default function BaseEntity<T extends Document>(model: Model<T>) {
  return {
    async getById(id: string): Promise<T | null> {
      return new Promise((resolve, reject) => {
        model.findById(id, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    },

    async getAll(): Promise<T[]> {
      return new Promise((resolve, reject) => {
        model.find({}, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    },

    async getPaginated(
      size: number,
      page: number,
      sort = 'updatedAt',
      sortDirection: 'asc' | 'desc' = 'desc'
    ): Promise<PaginatedResponse<T>> {
      return new Promise((resolve, reject) => {
        const skip = size * page;
        const sortObj = { [sort]: sortDirection === 'desc' ? -1 : 1 };

        model
          .find({})
          .sort(sortObj)
          .skip(skip)
          .limit(size)
          .exec((err, docs) => {
            if (err) return reject(err);
            model.countDocuments((err, total) => {
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

    async find(conditions: any): Promise<T[]> {
      return new Promise((resolve, reject) => {
        model.find(conditions, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    },

    async findOne(conditions: any): Promise<T | null> {
      return new Promise((resolve, reject) => {
        model.findOne(conditions, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    },

    async create(data: Partial<T>): Promise<T> {
      return model.create(data);
    },

    async updateById(id: string, updated: Partial<T>): Promise<T | null> {
      return new Promise((resolve, reject) => {
        model.findByIdAndUpdate(id, updated, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    },

    async update(condition: any, updated: Partial<T>): Promise<T | null> {
      return new Promise((resolve, reject) => {
        model.update(condition, updated, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    },

    async deleteById(id: string): Promise<T | null> {
      return new Promise((resolve, reject) => {
        model.findByIdAndDelete(id, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    },

    toResponseObject(entityObject: T) {
      return entityObject.toObject();
    },
  };
}
