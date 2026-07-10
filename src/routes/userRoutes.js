import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { authenticate } from '../middleware/authenticate.js';

import { getUserById, getSavedStories } from '../controllers/userController.js';

import { getCurrentUserController } from '../controllers/userController.js';

import {
  getUserArticlesSchema,
  getSavedStoriesSchema,
  getUserStoriesSchema
} from '../validations/userValidation.js';

const router = Router();

// Отримати збережені історії поточного користувача
router.get(
  '/users/saved',
  authenticate,
  celebrate(getSavedStoriesSchema),
  getSavedStories,
);

router.get('/users/:userId', celebrate(getUserArticlesSchema), getUserById);

router.get('/users/me', authenticate, ctrlWrapper(getCurrentUserController));

export default router;
