import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Story } from '../models/story.js';

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page);
  const perPage = parseInt(req.query.perPage);
  const skip = (page - 1) * perPage;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'Такий користувач відсутній');
  }

  const [totalItems, articles] = await Promise.all([
    Story.countDocuments({ ownerId: userId }),
    Story.find({ ownerId: userId })
      .select('img title ownerId')
      .populate('ownerId', 'name savedArticles')
      .skip(skip)
      .limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    user,
    articles,
    pagination: {
      page,
      perPage,
      totalItems,
      totalPages,
    },
  });
};

// ADDED(from SashaOsp BE-07): Приватний endpoint для отримання збережених історій користувача

export const getSavedStories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 6;

  const skip = (page - 1) * perPage;

  // TODO:
  // Після merge перевірити:
  // 1. Чи поле називається savedArticles.
  // 2. Чи ref у User = "Story" замість "Article".
  // 3. Чи populate("savedArticles") працює.

  const user = await User.findById(req.user._id).populate('savedArticles');

  if (!user) {
    throw createHttpError(404, 'Користувача не знайдено');
  }

  const savedStories = user.savedArticles;

  const totalItems = savedStories.length;
  const totalPages = Math.ceil(totalItems / perPage);

  const stories = savedStories.slice(skip, skip + perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    stories,
  });
};

export const getCurrentUserController = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};
