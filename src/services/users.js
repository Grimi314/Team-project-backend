import { User } from "../models/user.js";
import crypto from 'node:crypto';
import createHttpError from 'http-errors';
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';

export const addStoryToSaved = async (userId, storyId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $addToSet: { savedArticles: storyId } }, 
    { new: true } 
  ).select('-password');
};

export const removeStoryFromSaved = async (userId, storyId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { savedArticles: storyId } },
    { new: true }
  ).select('-password');
};

export const updateUserProfile = async (userId, data) => {
  const { email, ...profileData } = data;

  if (email) {
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      throw createHttpError(404, 'Користувача не знайдено');
    }

    if (email === currentUser.email) {
      return await User.findByIdAndUpdate(
        userId,
        profileData,
        {
          new: true,
          runValidators: true,
        },
      ).select('-password');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw createHttpError(409, 'Користувач з таким email вже існує');
    }

       const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...profileData,
        pendingEmail: email,
        emailVerificationToken,
        emailVerificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60),
      },
      {
        new: true,
        runValidators: true,
      },
    ).select('-password');

    await sendVerificationEmail({
      email,
      token: emailVerificationToken,
    });

    return updatedUser;
  }

  return await User.findByIdAndUpdate(
    userId,
    profileData,
    {
      new: true,
      runValidators: true,
    },
  ).select('-password');
};