import { Story } from "../validations/storyValidation.js";
import createHttpError from "http-errors";

export const getStoryById = async (req, res) => {
  const { storyId } = req.params;

  const story = Story.findById(storyId);
  if (!story) {
    throw createHttpError(404, "сторінку не знайдено ");
  }

  res.status(200).json({ story });
};
