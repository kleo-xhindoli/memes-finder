import { Model, Document } from 'mongoose';

export default function BaseEntity<T extends Document>(model: Model<T>) {
  return {
    async getById(id: string): Promise<T> {
      return new Promise((resolve, reject) => {
        model.findById(id, (err, res: T) => {
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
