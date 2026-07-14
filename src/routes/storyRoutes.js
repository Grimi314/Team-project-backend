import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import {
  getArticlesSchema,
  storyIdParamSchema,
} from '../validations/storyValidation.js';

import {
  getAllStoriesSchema,
  createStorySchema,
  popularStoriesSchema,
} from '../validations/storyValidation.js';

import {
  getAllStories,
  getArticles,
  getPopularStories,
} from '../controllers/storyController.js';
import { getStoryById } from '../controllers/storyController.js';
import { createStoryController } from '../controllers/storyController.js';
import {
  addSavedStory,
  removeSavedStory,
  getAllCategories,
  getRecommendedStoriesController,
} from '../controllers/storyController.js';

import { upload } from '../middleware/multer.js';
import { authenticate } from '../middleware/authenticate.js';

const storyRouter = Router();

storyRouter.get('/articles', celebrate(getArticlesSchema), getArticles);
storyRouter.get('/recommended', getRecommendedStoriesController);
storyRouter.get('/popular', celebrate(popularStoriesSchema), getPopularStories);
storyRouter.get('/categories', getAllCategories);
storyRouter.get('/', celebrate(getAllStoriesSchema), getAllStories);

storyRouter.get('/stories/:storyId', getStoryById);
storyRouter.post(
  '/stories',
  authenticate,
  upload.single('img'),
  celebrate({
    [Segments.BODY]: createStorySchema,
  }),
  createStoryController,
);
storyRouter.post(
  '/stories/:storyId/saved',
  authenticate,
  celebrate(storyIdParamSchema),
  addSavedStory,
);
storyRouter.delete(
  '/stories/:storyId/saved',
  authenticate,
  celebrate(storyIdParamSchema),
  removeSavedStory,
);

export default storyRouter;
