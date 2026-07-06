import { Router } from "express";
import { celebrate } from "celebrate";

import { authenticate } from "../middleware/authenticate.js";

import { getUserById, getSavedStories } from "../controllers/userController.js";

import {
  userIdParamSchema,
  getUserArticlesSchema,
  getSavedStoriesSchema,
} from "../validations/userValidation.js";

const router = Router();

router.get(
  "/api/users/:userId",
  celebrate(userIdParamSchema, getUserArticlesSchema),
  getUserById,
);

// Отримати збережені історії поточного користувача
router.get(
  "/api/users/saved",
  authenticate,
  celebrate(getSavedStoriesSchema),
  getSavedStories,
);

export default router;
