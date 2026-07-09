import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

export const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message("Невірний формат ідентифікатора")
    : value;
};

export const createUserSchema = {
  [Segments.BODY]: Joi.object({
    avatarUrl: Joi.string(),
    name: Joi.string().min(3).max(32).required().messages({
      "string.base": "Ім'я повинне бути рядком",
      "string.min": "Ім'я повинне бути не менше {#limit} символів",
      "string.max": "Ім'я повинне бути не більше {#limit} символів",
      "any.required": "Обов'язково вказати ім'я",
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

export const updateUserProfileSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(32).messages({
      "string.base": "Ім'я повинне бути рядком",
      "string.min": "Ім'я повинне бути не менше {#limit} символів",
      "string.max": "Ім'я повинне бути не більше {#limit} символів",
    }),

    avatar: Joi.string().uri().allow(null, ""),

    email: Joi.string().email().messages({
      "string.email": "Некоректний формат email",
    }),
  }).min(1),
};