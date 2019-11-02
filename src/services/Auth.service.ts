import bcrypt from 'bcrypt';
import UserService from './User.service';
import { InvalidEmailOrPasswordError, EmailExistsError } from '../utils/errors';
import { UserResponse } from '../types';
import * as jwt from 'jsonwebtoken';
import config from '../config';

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
): Promise<UserResponse> {
  const exists = await UserService.findByEmail(email);
  if (exists) {
    throw new EmailExistsError();
  }
  const password = await hashPassword(txtPassword);
  const user = {
    email,
    password,
    firstName,
    lastName,
  };
  const created = await UserService.create(user);

  return UserService.toResponseObject(created);
}

export async function login(
  email: string,
  txtPassword: string
): Promise<UserResponse> {
  const user = await UserService.findByEmail(email);
  if (!user) throw new InvalidEmailOrPasswordError();
  const hash = user.password;
  const validPw = await comparePassword(txtPassword, hash);
  if (!validPw) throw new InvalidEmailOrPasswordError();
  return UserService.toResponseObject(user);
}

export function verifyAndDecode(token: string) {
  let decoded = jwt.verify(token, config.secret);
  return decoded;
}

export function generateAuthToken(user: UserResponse): string {
  return jwt.sign(user, config.secret, {
    expiresIn: config.tokenLifespan,
  });
}
