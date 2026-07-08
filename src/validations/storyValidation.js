import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

const objectIdValidation = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message("Некоректна категорія.");
  }
  return value;
};

export const getArticlesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().max(6).default(6),
  }),
};

export const createStorySchema = Joi.object({
  title: Joi.string().min(2).max(40).required().messages({
    "string.empty": "Заголовок є обов'язковим.",
    "string.min": "Заголовок має містити щонайменше 2 символи.",
    "string.max": "Заголовок має містити не більше 40 символів.",
    "any.required": "Заголовок є обов'язковим.",
  }),
  article: Joi.string().min(12).max(3000).required().messages({
    "string.empty": "Текст історії є обов'язковим.",
    "string.min": "Текст історії має містити щонайменше 12 символів.",
    "string.max": "Текст історії має містити не більше 3000 символів.",
    "any.required": "Текст історії є обов'язковим.",
  }),
  category: Joi.string().custom(objectIdValidation).required().messages({
    "string.empty": "Категорія є обов'язковою.",
    "any.required": "Категорія є обов'язковою.",
  }),
});

export const getAllStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Номер сторінки має бути числом",
      "number.integer": "Номер сторінки має бути цілим числом",
      "number.min": "Номер сторінки має бути не менше 1",
    }),
    perPage: Joi.number().integer().min(1).max(100).default(10).messages({
      "number.base": "Кількість елементів на сторінці має бути числом",
      "number.integer": "Кількість елементів на сторінці має бути цілим числом",
      "number.min":
        "Кількість елементів на сторінці повинна бути не меншою за 1",
      "number.max":
        "Кількість елементів на сторінці повинна бути не меншою за 100",
    }),
    category: Joi.string().custom(objectIdValidation),
  }),
};

export const popularStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Номер сторінки має бути числом",
      "number.integer": "Номер сторінки має бути цілим числом",
      "number.min": "Номер сторінки має бути не менше 1",
    }),
    perPage: Joi.number().integer().min(1).max(100).default(9).messages({
      "number.base": "Кількість елементів на сторінці має бути числом",
      "number.integer": "Кількість елементів на сторінці має бути цілим числом",
      "number.min":
        "Кількість елементів на сторінці повинна бути не меншою за 1",
      "number.max":
        "Кількість елементів на сторінці повинна бути не меншою за 100",
    }),
  }),
};
