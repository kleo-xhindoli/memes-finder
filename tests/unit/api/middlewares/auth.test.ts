import * as AuthService from '../../../../src/services/Auth.service';
import auth from '../../../../src/api/middlewares/auth';

jest.mock('../../../../src/services/Auth.service');

const nextFn = jest.fn();
let req: any;
let res: any;

describe('Unit | Middleware | Auth', () => {
  describe('auth middleware happy path', () => {
    beforeEach(() => {
      nextFn.mockClear();
      req = {
        header: () => 'Bearer sometoken',
      };
      res = {};
    });

    it('calls next with no error if the token is valid', () => {
      expect.assertions(2);
      // @ts-ignore
      AuthService.verifyAndDecode.mockReturnValue({ email: 'test@email.com' });
      auth(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0]).toBeUndefined();
    });

    it('sets the req.decoded value to the decoded token', () => {
      const decoded = { email: 'test@email.com' };
      // @ts-ignore
      AuthService.verifyAndDecode.mockReturnValue(decoded);
      auth(req, res, nextFn);

      expect(req.decoded).toMatchObject(decoded);
    });
  });

  describe('auth middleware no token', () => {
    beforeEach(() => {
      nextFn.mockClear();
      req = {
        header: () => undefined,
      };
      res = {};
    });

    it('calls next with an unauthorized error if no token is provided', () => {
      expect.assertions(3);
      auth(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0].message).toBe(
        'Authorization header is missing'
      );
      expect(nextFn.mock.calls[0][0].output.statusCode).toBe(401);
    });
  });

  describe('auth middleware invalid token', () => {
    beforeEach(() => {
      nextFn.mockClear();
      req = {
        header: () => 'Bearer invalidtoken',
      };
      res = {};
    });

    it('calls next with an unauthorized error if an invalid token is provided', () => {
      expect.assertions(3);
      // @ts-ignore
      AuthService.verifyAndDecode.mockImplementation(() => {
        throw new Error('Invalid token');
      });
      auth(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0].message).toBe('Invalid token');
      expect(nextFn.mock.calls[0][0].output.statusCode).toBe(401);
    });
  });
});
