import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { authenticate } from '../middleware/authenticate.js';
import { getStoriesByUserId } from '../controllers/storyController.js';

import {
  getUserById,
  getSavedStories,
  updateUserProfileController,
  verifyEmailChangeController,
} from '../controllers/userController.js';

import { getCurrentUserController } from '../controllers/userController.js';

import { getTravellers } from '../controllers/travellerController.js';

import {
  getUserArticlesSchema,
  getSavedStoriesSchema,
  getUserStoriesSchema,
  updateUserProfileSchema,
  paginationTravellers,
} from '../validations/userValidation.js';

const router = Router();

router.get('/users/me', authenticate, ctrlWrapper(getCurrentUserController));

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

//Отримуємо список всіх мандрівників
router.get('/travellers', celebrate(paginationTravellers), getTravellers);

router.get('/users/verify-email/:token', verifyEmailChangeController);

router.get('/users/:userId', celebrate(getUserArticlesSchema), getUserById);

router.get(
  '/users/:userId/stories',
  celebrate(getUserStoriesSchema),
  getStoriesByUserId,
);

export default router;
