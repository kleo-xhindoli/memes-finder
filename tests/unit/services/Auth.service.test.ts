import UserService from '../../../src/services/User.service';
import { register, login } from '../../../src/services/Auth.service';
import {
  EmailExistsError,
  InvalidEmailOrPasswordError,
} from '../../../src/utils/errors';
jest.mock('../../../src/services/User.service');

const fakeUser = {
  email: 'test@email.com',
  password: 'pass1234.',
  firstName: 'John',
  lastName: 'Doe',
};

describe('Unit | Service | Auth', () => {
  describe('register', () => {
    it('should return a user response when valid input is given', async () => {
      const userResponse = {
        ...fakeUser,
        _id: 'fake-id',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // @ts-ignore
      UserService.findByEmail.mockResolvedValue(null);
      // @ts-ignore
      UserService.toResponseObject.mockResolvedValue(userResponse);

      const res = await register(
        fakeUser.email,
        fakeUser.password,
        fakeUser.firstName,
        fakeUser.lastName
      );

      expect(res).toStrictEqual({
        ...userResponse,
      });
    });

    it('should throw an `EmailExistsError` when the email exists', async () => {
      // @ts-ignore
      UserService.findByEmail.mockResolvedValue(fakeUser);
      await expect(
        register(
          fakeUser.email,
          fakeUser.password,
          fakeUser.firstName,
          fakeUser.lastName
        )
      ).rejects.toThrow(EmailExistsError);
    });
  });

  describe('login', () => {
    it('should return a user response when valid input is given', async () => {
      const userResponse = {
        ...fakeUser,
        _id: 'fake-id',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // @ts-ignore
      UserService.findByEmail.mockResolvedValue({
        ...fakeUser,
        password:
          '$2b$10$nO7xtz1znYRJW6SRsQYIBuas/tPNMQ134eQOYvCrw0ItVWl9lMpcO', // pass1234.
      });
      // @ts-ignore
      UserService.toResponseObject.mockResolvedValue(userResponse);

      const res = await login('test@email.com', 'pass1234.');

      expect(res).toStrictEqual(userResponse);
    });

    it('should throw for an invalid email input', async () => {
      // @ts-ignore
      UserService.findByEmail.mockResolvedValue(null);

      await expect(login('test@email.com', 'pass1234.')).rejects.toThrow(
        InvalidEmailOrPasswordError
      );
    });

    it('should throw for an invalid password input', async () => {
      const userResponse = {
        ...fakeUser,
        _id: 'fake-id',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // @ts-ignore
      UserService.findByEmail.mockResolvedValue({
        ...fakeUser,
        password:
          '$2b$10$nO7xtz1znYRJW6SRsQYIBuas/tPNMQ134eQOYvCrw0ItVWl9lMpcO', // pass1234.
      });
      // @ts-ignore
      UserService.toResponseObject.mockResolvedValue(userResponse);

      await expect(login('test@email.com', 'pass1235.')).rejects.toThrow(
        InvalidEmailOrPasswordError
      );
    });
  });
});
