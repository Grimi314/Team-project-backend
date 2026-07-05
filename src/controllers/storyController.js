import createHttpError from "http-errors";

import { Story } from "../models/story.js";
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

export const getArticles = async (req, res) => {
  const { page = 1, perPage = 6 } = req.query;
  const skip = (page - 1) * perPage;
  const articlesQuery = Story.find();
  const [totalItems, articles] = await Promise.all([
    articlesQuery.clone().countDocuments(),
    articlesQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    articles,
  });
};

export const getStoryById = async (req, res) => {
  const { storyId } = req.params;

  const story = Story.findById(storyId);
  if (!story) {
    throw createHttpError(404, "сторінку не знайдено ");
  }

  res.status(200).json({ story });
};
