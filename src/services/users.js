import { User } from "../models/user.js";

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