import createHttpError from 'http-errors';
import { User } from '../models/user.js';

import { Category } from '../models/category.js';
import { Story } from '../models/story.js';
import { createStory } from '../services/stories.js';
import { addStoryToSaved, removeStoryFromSaved } from '../services/users.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

import { getRecommendedStories } from '../services/stories.js';

import mongoose from 'mongoose';

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
      throw createHttpError(401, 'Користувач не авторизований.');
    }
    const date = new Date().toISOString().split('T')[0];

    const story = await createStory({
      img,
      title,
      article,
      category,
      ownerId,
      date,
    });

    await User.findByIdAndUpdate(ownerId, {
      $inc: { articlesAmount: 1 },
    });

    res.status(201).json({
      status: 201,
      message: 'Історію успішно створено.',
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

  if (!mongoose.Types.ObjectId.isValid(storyId)) {
    throw createHttpError(400, 'Некоректний ID статті');
  }

 
  const story = await mongoose.connection
    .collection('stories')
    .findOne({
      _id: new mongoose.Types.ObjectId(storyId),
    });

  if (!story) {
    throw createHttpError(404, 'Статтю не знайдено');
  }

  res.status(200).json({
    story,
  });
};

export const getStoriesByUserId = async (req, res) => {
  const { userId } = req.params;
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 6;

  if (!userId) {
    throw createHttpError(400, 'User id is required');
  }

  const skip = (page - 1) * perPage;

  const filter = { ownerId: userId };

  const [totalItems, articles] = await Promise.all([
    Story.countDocuments(filter),
    Story.find(filter)
      .sort({ createdAt: -1, _id: 1 })
      .skip(skip)
      .limit(perPage)
      .populate('ownerId', 'name avatarUrl'),
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

export const addSavedStory = async (req, res) => {
  const { storyId } = req.params;
  const userId = req.user._id;
  const storyExists = await Story.findById(storyId);
  if (!storyExists) {
    throw createHttpError(404, 'Статтю не знайдено');
  }

  const updatedUser = await addStoryToSaved(userId, storyId);

  res.status(200).json({
    status: 200,
    message: 'Статтю успішно додано до збережених',
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
    throw createHttpError(404, 'Статтю не знайдено');
  }

  const updatedUser = await removeStoryFromSaved(userId, storyId);

  res.status(200).json({
    status: 200,
    message: 'Статтю успішно видалено зі збережених',
    data: {
      savedArticles: updatedUser.savedArticles,
    },
  });
};
export const getAllStories = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 6;
  const skip = (page - 1) * perPage;

  const filter = {};
  const category = req.query.category;

  if (category) {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: 'Неправильні дані в категорії' });
    }
    filter.category = new mongoose.Types.ObjectId(category);
  }

  const baseQuery = Story.find(filter);

  const [stories, totalStories] = await Promise.all([
    baseQuery
      .clone()
      .sort({ rate: -1 })
      .populate('ownerId', 'name avatarUrl')
      .populate('category', 'category')
      .skip(skip)
      .limit(perPage),
    baseQuery.clone().countDocuments(),
  ]);

  const totalPages = Math.ceil(totalStories / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems: totalStories,
    totalPages,
    nextPage: page < totalPages,
    previousPage: page > 1,
    stories,
  });
};

export const getPopularStories = async (req, res) => {
  const popularStories = await Story.find(
    //ще раз уточнити у ментора
    //{ 'savedByUsers.0': { $exists: true }, }
    { rate: { $gt: 0 } },
  )
    .sort({ rate: -1 })
    .limit(10)
    .populate('ownerId', 'name avatarUrl')
    .populate('category', 'category');

  if (!popularStories || popularStories.length === 0) {
    return res.status(200).json([]);
  }

  res.status(200).json(popularStories);
};

export const getAllCategories = async (req, res) => {
  const categories = await Category.find({}).sort({ category: 1 });
  return res.status(200).json(categories);
};

export const getRecommendedStoriesController = async (req, res) => {
  const result = await getRecommendedStories(req.query);

  res.status(200).json(result);
};
