import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type PartialUser = Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName'>;
type SafeUser = Omit<IUser, 'password'>;
