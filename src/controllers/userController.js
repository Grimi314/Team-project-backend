import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { Story } from "../models/story.js";
import { updateUserProfile } from "../services/users.js";

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

 // ADDED (BE-13 Tory): Приватний endpoint для оновлення профілю користувача
export const updateUserProfileController = async (req, res) => {
  const updatedUser = await updateUserProfile(
    req.user._id,
    req.body,
  );

  if (!updatedUser) {
    throw createHttpError(404, "Користувача не знайдено");
  }

  res.status(200).json({
    status: 200,
    message: "Профіль успішно оновлено",
    data: updatedUser,
  });
};

// ADDED (BE-13 Tory): Підтвердження зміни email
export const verifyEmailChangeController = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationTokenExpires: { $gt: new Date() },
  });

  if (!user) {
    throw createHttpError(400, "Токен підтвердження недійсний або прострочений");
  }

  user.email = user.pendingEmail;
  user.pendingEmail = null;
  user.emailVerificationToken = null;
  user.emailVerificationTokenExpires = null;

  await user.save();

  res.status(200).json({
    status: 200,
    message: "Email успішно підтверджено",
    data: user,
  });
};
export const getCurrentUserController = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};
