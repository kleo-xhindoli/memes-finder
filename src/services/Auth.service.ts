import bcrypt from 'bcrypt';
import UserService from './User.service';
import { InvalidEmailOrPasswordError, EmailExistsError } from '../utils/errors';
import { IUser, SafeUser } from '../types';

const CYCLES = 10 as const;

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
): Promise<SafeUser> {
  const exists = await UserService.findByEmail(email);
  if (exists) {
    throw new EmailExistsError();
  }
  console.log('register');
  const password = await hashPassword(txtPassword);
  const user = {
    email,
    password,
    firstName,
    lastName,
  };
  console.log('after');
  console.log(user);
  const created = await UserService.create(user);
  console.log(created);
  delete created.password;
  return created;
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
