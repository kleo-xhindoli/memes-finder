import joi from 'joi';

export const loginPayloadSchema = {
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .min(6)
    .required(),
};

export const registerPayloadSchema = {
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .min(6)
    .required(),
  firstName: joi
    .string()
    .max(30)
    .required(),
  lastName: joi
    .string()
    .max(30)
    .required(),
};
