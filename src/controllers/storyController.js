import createHttpError from "http-errors";
import { Story } from "../models/story.js";
import { addStoryToSaved, removeStoryFromSaved } from '../services/users.js';

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

export const addSavedStory = async (req, res) => {
  const { storyId } = req.params;
  const userId = req.user._id;
  const storyExists = await Story.findById(storyId);
  if (!storyExists) {
    throw createHttpError(404, "Статтю не знайдено");
  }

  const updatedUser = await userService.addStoryToSaved(userId, storyId);

  res.status(200).json({
    status: 200,
    message: "Статтю успішно додано до збережених",
    data: {
      savedArticles: updatedUser.savedArticles,
    },
  });
};

export const removeSavedStory = async (req, res) => {
  const { storyId } = req.params;
  const userId = req.user._id;

  const storyExists = await Story.findById(storyId);
  if (!storyExists) {
    throw createHttpError(404, "Статтю не знайдено");
  }

  const updatedUser = await userService.removeStoryFromSaved(userId, storyId);

  res.status(200).json({
    status: 200,
    message: "Статтю успішно видалено зі збережених",
    data: {
      savedArticles: updatedUser.savedArticles,
    },
  });
};