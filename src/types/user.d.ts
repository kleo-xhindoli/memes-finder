import { Document } from 'mongoose';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type IUser = User & Document;

export type UserInput = Pick<
  User,
  'email' | 'password' | 'firstName' | 'lastName'
>;
export type UserResponse = Omit<User, 'password'>;
