import User from '../models/User.model';
import { IUser, UserInput, UserResponse } from '../types';
import BaseEntity from './base/BaseEntity';

const base = BaseEntity(User);

export default {
  ...base,

  async findByEmail(email: string): Promise<IUser | null> {
    return await base.findOne({ email });
  },

  async create(user: UserInput): Promise<IUser> {
    return base.create(user);
  },

  toResponseObject(user: IUser): UserResponse {
    return {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
};
