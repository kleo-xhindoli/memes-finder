import { Model, Document } from 'mongoose';

export default class BaseEntity<T extends Document> {
  constructor(private model: Model<T>) {}

  async getById(id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.findById(id, (err, res: T) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  async getAll(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.model.find({}, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  async find(conditions: any): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.model.find(conditions, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  async findOne(conditions: any): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.model.findOne(conditions, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async updateById(id: string, updated: Partial<T>): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndUpdate(id, updated, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      })
    })
  }

  async update(condition: any, updated: Partial<T>): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.model.update(condition, updated, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      })
    })
  }

  async deleteById(id: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndDelete(id, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }
}
