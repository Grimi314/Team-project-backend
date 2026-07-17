import mongoose from 'mongoose';
import createHttpError from 'http-errors';

import { Story } from '../models/story.js';
import '../models/user.js';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 3;
const MAX_PER_PAGE = 20;

const getStringQueryParam = (value) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  if (typeof value !== 'string') {
    return undefined;
  }

  return value;
};

const normalizePositiveInteger = (value, defaultValue) => {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    return defaultValue;
  }

  return number;
};

const buildPagination = ({ page, perPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const createStory = async (payload) => {
  return await Story.create(payload);
};

export const getRecommendedStories = async (query) => {
  const category = getStringQueryParam(query.category)?.trim();

  // if (!category) {
  //   throw createHttpError(400, 'Category query parameter is required');
  // }

  // if (!mongoose.isValidObjectId(category)) {
  if (category && !mongoose.isValidObjectId(category)) {
    throw createHttpError(400, 'Category must be a valid id');
  }

  const page = normalizePositiveInteger(
    getStringQueryParam(query.page),
    DEFAULT_PAGE,
  );
  const requestedPerPage = normalizePositiveInteger(
    getStringQueryParam(query.perPage),
    DEFAULT_PER_PAGE,
  );
  const perPage = Math.min(requestedPerPage, MAX_PER_PAGE);
  const skip = (page - 1) * perPage;
  // const filter = { category };
  const filter = {};
  if (category) {
    filter.category = category;
  }

  const [stories, totalItems] = await Promise.all([
    Story.find(filter)
      .sort({ rate: -1, date: -1 })
      .skip(skip)
      .limit(perPage)
      .populate('ownerId', 'name avatarUrl')
      .lean(),
    Story.countDocuments(filter),
  ]);

  const data = stories.map((story) => ({
    _id: story._id,
    title: story.title,
    img: story.img,
    article: story.article,
    category: story.category,
    ownerId: story.ownerId?._id ?? story.ownerId,
    author: story.ownerId
      ? {
          _id: story.ownerId._id,
          name: story.ownerId.name,
          avatarUrl: story.ownerId.avatarUrl,
        }
      : null,
    rate: story.rate,
    rating: story.rate,
    date: story.date,
  }));

  return {
    data,
    ...buildPagination({ page, perPage, totalItems }),
  };
};

export const incrementStoryRate = async (storyId) => {
  return await Story.updateOne(
    { _id: storyId },
    { $inc: { rate: 1 } }
  );
};

export const decrementStoryRate = async (storyId) => {
  return await Story.updateOne(
    { _id: storyId },
    { $inc: { rate: -1 } }
  );
};
