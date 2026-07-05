import { Joi, Segments } from "celebrate";

export const getArticlesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().max(6).default(6),
  }),
};
