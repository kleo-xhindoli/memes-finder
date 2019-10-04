import bcrypt from 'bcrypt';
import UserService from './User.service';
import { InvalidEmailOrPasswordError } from '../utils/errors';
import { IUser, SafeUser } from '../types';

const CYCLES = 100 as const;

function hashPassword(password: string) {
  return bcrypt.hash(password, CYCLES);
}

function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function register(
  email: string,
  txtPassword: string,
  firstName: string,
  lastName: string
): Promise<IUser> {
  const password = await hashPassword(txtPassword);
  const user = {
    email,
    password,
    firstName,
    lastName,
  };
  return UserService.create(user);
}

export async function login(
  email: string,
  txtPassword: string
): Promise<SafeUser> {
  const user = await UserService.findByEmail(email);
  if (!user) throw new InvalidEmailOrPasswordError();
  const hash = user.password;
  const validPw = await comparePassword(txtPassword, hash);
  if (!validPw) throw new InvalidEmailOrPasswordError();
  delete user.password;
  return user;
}
