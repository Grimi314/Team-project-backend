import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';

import { getUserById, getSavedStories, updateUserProfileController, verifyEmailChangeController, } from '../controllers/userController.js';

import { getStoriesByUserId } from '../controllers/storyController.js';

import {
  getUserArticlesSchema,
  getSavedStoriesSchema,
  getUserStoriesSchema,
  updateUserProfileSchema
} from '../validations/userValidation.js';

const router = Router();

// Отримати збережені історії поточного користувача
router.get(
  '/users/saved',
  authenticate,
  celebrate(getSavedStoriesSchema),
  getSavedStories,
);

// Оновлення профілю поточного користувача
router.patch(
  '/users/profile',
  authenticate,
  celebrate(updateUserProfileSchema),
  updateUserProfileController,
);

router.get(
  '/users/verify-email/:token',
  verifyEmailChangeController,
);

router.get('/users/:userId', celebrate(getUserArticlesSchema), getUserById);

router.get('/users/:userId/stories', celebrate(getUserStoriesSchema), getStoriesByUserId);

export default router;
