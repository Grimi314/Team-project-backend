import createHttpError from "http-errors";

import { createStory } from "../services/stories.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const createStoryController = async (req, res, next) => {
    try {
        const { title, article, category } = req.body;
        if (!req.file) {
            throw createHttpError(400, "Image is required");
        }
        const cloudinaryResult = await saveFileToCloudinary(req.file.buffer);
        const img = cloudinaryResult.secure_url;
        const ownerId = req.user?._id;
        if (!ownerId) {
            throw createHttpError(401, "User not authorized");
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
            message: "Story created successfully",
            data: story,
        });
    } catch (error) {
        console.error("CREATE STORY ERROR:", error);

        res.status(500).json({
            message: error.message,
            name: error.name,
            error,
        });
    }
};
