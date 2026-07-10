import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message('Невірний формат ідентифікатора')
    : value;
};

export const createUserSchema = {
  [Segments.BODY]: Joi.object({
    avatarUrl: Joi.string(),
    name: Joi.string().min(3).max(32).required().messages({
      'string.base': "Ім'я повинне бути рядком",
      'string.min': "Ім'я повинне бути не менше {#limit} символів",
      'string.max': "Ім'я повинне бути не більше {#limit} символів",
      'any.required': "Обов'язково вказати ім'я",
    }),
    articlesAmount: Joi.number().integer().min(0).required(),
  }),
};
export const userIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().custom(objectIdValidator).required(),
  }),
};
export const getUserArticlesSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24).required(),
    articleId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(6).default(6),
  }),
};

export const getSavedStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(6).default(6),
  }),
};

export const getUserStoriesSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(20),
  }),
};

export const paginationTravellers = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Номер сторінки має бути числом',
      'number.integer': 'Номер сторінки має бути цілим числом',
      'number.min': 'Номер сторінки має бути не менше 1',
    }),
    perPage: Joi.number().integer().min(1).max(100).default(12).messages({
      'number.base': 'Кількість елементів на сторінці має бути числом',
      'number.integer': 'Кількість елементів на сторінці має бути цілим числом',
      'number.min':
        'Кількість елементів на сторінці повинна бути не меншою за 1',
      'number.max':
        'Кількість елементів на сторінці повинна бути не меншою за 100',
    }),
  }),
};
