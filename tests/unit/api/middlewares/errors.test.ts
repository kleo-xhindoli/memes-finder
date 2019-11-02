import joi from 'joi';
import { notFound, converter } from '../../../../src/api/middlewares/error';
import Boom from 'boom';

jest.mock('../../../../src/services/Auth.service');

const nextFn = jest.fn();
const req: any = {};
const res: any = {
  status: jest.fn(),
  json: jest.fn(),
};

describe('Unit | Middleware | Error', () => {
  describe('notFound', () => {
    beforeEach(() => {
      res.status.mockClear();
      res.json.mockClear();
    });

    it('calls res with a 404 status', () => {
      expect.assertions(4);
      notFound(req, res);
      expect(res.status.mock.calls.length).toBe(1);
      expect(res.status.mock.calls[0][0]).toBe(404);
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0]).toMatchObject({
        status: 404,
        message: 'Not Found',
        error: 'Not Found',
      });
    });
  });

  describe('converter', () => {
    beforeEach(() => {
      nextFn.mockClear();

      res.status.mockClear();
      res.json.mockClear();
    });

    it('calls res with a 400 status on a validation err', () => {
      expect.assertions(3);
      const { error } = joi.validate({ name: 'blah' }, { title: joi.string() });
      converter(error, req, res, nextFn);
      expect(res.status.mock.calls.length).toBe(1);
      expect(res.status.mock.calls[0][0]).toBe(400);
      expect(res.json.mock.calls.length).toBe(1);
    });

    it('calls res with a 404 status on a ObjectID cast error', () => {
      expect.assertions(3);

      let error: any = Boom.badImplementation('CastError');
      error.value = 'test';
      error.name = 'CastError';

      converter(error, req, res, nextFn);

      expect(res.status.mock.calls.length).toBe(1);
      expect(res.status.mock.calls[0][0]).toBe(404);
      expect(res.json.mock.calls.length).toBe(1);
    });

    it('calls res with a the corresponding Boom err status on a Boom error', () => {
      expect.assertions(4);

      const error = Boom.forbidden('This is forbidden');

      converter(error, req, res, nextFn);

      expect(res.status.mock.calls.length).toBe(1);
      expect(res.status.mock.calls[0][0]).toBe(403);
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0].message).toBe('This is forbidden');
    });

    it('calls res with a 500 status on a random error', () => {
      expect.assertions(4);

      const error = new Error('random error');

      converter(error, req, res, nextFn);

      expect(res.status.mock.calls.length).toBe(1);
      expect(res.status.mock.calls[0][0]).toBe(500);
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0].message).toBe('random error');
    });
  });
});
