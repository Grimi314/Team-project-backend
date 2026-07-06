import createHttpError from "http-errors";
import { Story } from "../models/story.js";

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

export const getStoriesByUserId = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, perPage = 6 } = req.query;

  if (!userId) {
    throw createHttpError(400, "User id is required");
  }

  const skip = (Number(page) - 1) * Number(perPage);

  const filter = { ownerId: userId };

  const [totalItems, articles] = await Promise.all([
    Story.countDocuments(filter),
    Story.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(perPage))
      .populate("ownerId", "name avatarUrl"),
  ]);

  const totalPages = Math.ceil(totalItems / Number(perPage));

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalItems,
    totalPages,
    articles,
  });
};
