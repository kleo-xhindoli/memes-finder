import joi from 'joi';

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
