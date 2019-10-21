import joi, { string } from 'joi';

export const createPayloadSchema = {
  title: joi.string().required(),
  description: joi.string().required(),
  keyPhrases: joi
    .array()
    .items(joi.string())
    .default([]),
  sourceUrls: {
    video: joi.string(),
    image: joi.string(),
    thumbnail: joi.string(),
  },
  participants: joi
    .array()
    .items(joi.string())
    .default([]),
  originalSources: joi.array().items(
    joi
      .object()
      .keys({
        name: joi.string(),
        url: joi.string().uri(),
      })
      .default([])
  ),
  lang: joi
    .string()
    .valid(['en', 'al'])
    .default('al'),
};

export const updatePayloadSchema = {
  _id: joi.string(),
  title: joi.string(),
  description: joi.string(),
  keyPhrases: joi.array().items(joi.string()),
  sourceUrls: {
    video: joi.string(),
    image: joi.string(),
    thumbnail: joi.string(),
  },
  participants: joi.array().items(joi.string()),
  originalSources: joi.array().items(
    joi.object().keys({
      name: joi.string(),
      url: joi.string().uri(),
    })
  ),
  lang: joi.string().valid(['en', 'al']),
};

export const searchQuerySchema = {
  page: joi
    .number()
    .min(0)
    .default(0),
  size: joi
    .number()
    .min(0)
    .default(50),
  query: joi
    .string()
    .required()
    .min(3),
};
