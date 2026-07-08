import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';

import { getUserById, getSavedStories } from '../controllers/userController.js';

import {
  getUserArticlesSchema,
  getSavedStoriesSchema,
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

export default router;
