import joi from 'joi';

import {
  validateBody,
  validateQueryParams,
} from '../../../../src/api/middlewares/validator';

const nextFn = jest.fn();
let req: any = {};
let res: any = {};

describe('Unit | Middleware | Validator', () => {
  describe('validateBody', () => {
    beforeEach(() => {
      nextFn.mockClear();
      req = {
        body: {
          name: 'John Doe',
          hasAuth: false,
          age: 36,
        },
      };
      res = {};
    });

    it(`calls next with the validation error when one or more body 
      fields dont match the schema types`, () => {
      validateBody({
        name: joi.string(),
        age: joi.number(),
        hasAuth: joi.number(),
      })(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0]).toHaveProperty('isJoi', true);
    });

    it(`calls next with the validation error when one or more required
      properties are missing from the body`, () => {
      validateBody({
        name: joi.string(),
        age: joi.number(),
        hasAuth: joi.boolean(),
        birthday: joi.string().required(),
      })(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0]).toHaveProperty('isJoi', true);
    });

    it(`calls next with the validation error when one or more fields
      doesnt meet the schema constraints`, () => {
      validateBody({
        name: joi.string().min(60),
        age: joi.number(),
        hasAuth: joi.boolean(),
        birthday: joi.string().required(),
      })(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0]).toHaveProperty('isJoi', true);
    });

    it(`calls next with the validation error when the body has one
      or more fields not specified in the schema`, () => {
      validateBody({
        name: joi.string().min(60),
        age: joi.number(),
      })(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0]).toHaveProperty('isJoi', true);
    });

    it(`calls next with no errors if one or more non-required fields
      are missing from the body`, () => {
      validateBody({
        name: joi.string(),
        age: joi.number(),
        hasAuth: joi.boolean(),
        birthday: joi.string(),
      })(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0]).toBeUndefined();
    });

    it(`sets the validatedBody property in the req object`, () => {
      validateBody({
        name: joi.string(),
        age: joi.number(),
        hasAuth: joi.boolean(),
      })(req, res, nextFn);

      expect(req.validatedBody).toMatchObject(req.body);
    });

    it(`populates the validatedBody property in the req object 
      with the default values specified in the schema`, () => {
      validateBody({
        name: joi.string(),
        age: joi.number(),
        hasAuth: joi.boolean(),
        employmentStatus: joi.string().default('Unemployed'),
      })(req, res, nextFn);

      expect(req.validatedBody).toMatchObject({
        ...req.body,
        employmentStatus: 'Unemployed',
      });
    });
  });

  describe('validateQueryParams', () => {
    beforeEach(() => {
      nextFn.mockClear();
      req = {
        query: {
          page: 23,
          sort: 'title',
          limit: 90,
        },
      };
      res = {};
    });

    it(`calls next with the validation error when one or more query 
      fields dont match the schema types`, () => {
      validateQueryParams({
        page: joi.number(),
        sort: joi.string(),
        limit: joi.object(),
      })(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0]).toHaveProperty('isJoi', true);
    });

    it(`calls next with the validation error when one or more required
      properties are missing from the query`, () => {
      validateQueryParams({
        page: joi.number(),
        sort: joi.string(),
        limit: joi.number(),
        filter: joi.string().required(),
      })(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0]).toHaveProperty('isJoi', true);
    });

    it(`calls next with the validation error when one or more fields
      doesnt meet the schema constraints`, () => {
      validateQueryParams({
        page: joi.number().max(5),
        sort: joi.string(),
        limit: joi.number(),
      })(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0]).toHaveProperty('isJoi', true);
    });

    it(`calls next with the validation error when the query has one
      or more fields not specified in the schema`, () => {
      validateQueryParams({
        sort: joi.string(),
        limit: joi.number(),
      })(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0]).toHaveProperty('isJoi', true);
    });

    it(`calls next with no errors if one or more non-required fields
      are missing from the query`, () => {
      validateQueryParams({
        page: joi.number().required(),
        sort: joi.string().required(),
        limit: joi.number(),
        filter: joi.string(),
      })(req, res, nextFn);

      expect(nextFn.mock.calls.length).toBe(1);
      expect(nextFn.mock.calls[0][0]).toBeUndefined();
    });

    it(`sets the validatedQueryParams property in the req object`, () => {
      validateQueryParams({
        page: joi.number(),
        sort: joi.string(),
        limit: joi.number(),
      })(req, res, nextFn);

      expect(req.validatedQueryParams).toMatchObject(req.query);
    });

    it(`populates the validatedQueryParams property in the req object 
      with the default values specified in the schema`, () => {
      validateQueryParams({
        page: joi.number(),
        sort: joi.string(),
        limit: joi.number(),
        filter: joi.string().default('createdBy'),
      })(req, res, nextFn);

      expect(req.validatedQueryParams).toMatchObject({
        ...req.query,
        filter: 'createdBy',
      });
    });
  });
});
