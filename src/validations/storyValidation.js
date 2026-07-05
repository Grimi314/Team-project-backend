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
