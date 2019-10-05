import User from '../models/User';
import { IUser, UserInput, UserResponse } from '../types';
import BaseEntity from './base/BaseEntity';

class UserService extends BaseEntity<IUser> {
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.findOne({
      email,
    });
  }

  async create(user: UserInput): Promise<IUser> {
    return super.create(user);
  }

  toResponseObject(user: IUser): UserResponse {
    return {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

export default new UserService(User);
