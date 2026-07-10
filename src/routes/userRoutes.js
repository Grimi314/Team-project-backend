import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';

import { getUserById, getSavedStories } from '../controllers/userController.js';

import { getStoriesByUserId } from '../controllers/storyController.js';

import { getTravellers } from '../controllers/travellerController.js';

import {
  getUserArticlesSchema,
  getSavedStoriesSchema,
  getUserStoriesSchema,
  paginationTravellers,
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

router.get(
  '/users/:userId/stories',
  celebrate(getUserStoriesSchema),
  getStoriesByUserId,
);

//Отримуємо список всіх мандрівників
router.get('/travellers', celebrate(paginationTravellers), getTravellers);

export default router;
