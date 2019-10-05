import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PartialUser = Pick<
  IUser,
  'email' | 'password' | 'firstName' | 'lastName'
>;
export type UserResponse = Pick<
  IUser,
  '_id' | 'email' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt'
>;
