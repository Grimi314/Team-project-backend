import createHttpError from "http-errors";

import { createStory } from "../services/stories.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const createStoryController = async (req, res, next) => {
    try {
        const { title, article, category } = req.body;
        if (!req.file) {
            throw createHttpError(400, "Зображення є обов'язковим.");
        }
        const cloudinaryResult = await saveFileToCloudinary(req.file.buffer);
        const img = cloudinaryResult.secure_url;
        const ownerId = req.user?._id;
        if (!ownerId) {
            throw createHttpError(401, "Користувач не авторизований.");
        }
        const date = new Date().toISOString().split("T")[0];
    
        const story = await createStory({
            img,
            title,
            article,
            category,
            ownerId,
            date,
        });
        
        res.status(201).json({
            status: 201,
            message: "Історію успішно створено.",
            data: story,
        });
    } catch (error) {
    next(error);
}
};
