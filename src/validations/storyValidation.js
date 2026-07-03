import { Joi } from "celebrate";
import { isValidObjectId } from "mongoose";

const objectIdValidation = (value, helpers) => {
    if (!isValidObjectId(value)) {
        return helpers.error('any.invalid');
    }
    return value;
};

export const createStorySchema = Joi.object({
    title: Joi.string().min(2).max(40).required(),
    article: Joi.string().min(12).max(3000).required(),
    category: Joi.string().custom(objectIdValidation).required(),
});