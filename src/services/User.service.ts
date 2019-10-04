import User from '../models/User';
import { IUser, PartialUser } from '../types';
import BaseEntity from './base/BaseEntity';

class UserService extends BaseEntity<IUser> {
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.findOne({
      email,
    });
  }

  async create(user: PartialUser): Promise<IUser> {
    return super.create(user)
  }
}

export default new UserService(User);
