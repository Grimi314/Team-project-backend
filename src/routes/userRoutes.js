import { Router } from "express";
import { celebrate } from "celebrate";
import { getUserById } from "../controllers/userController.js";
import { getStoriesByUserId } from "../controllers/storyController.js";
import {
  userIdParamSchema,
  getUserArticlesSchema,
} from "../validations/userValidation.js";

const router = Router();

router.get(
  "/api/users/:userId",
  celebrate(userIdParamSchema, getUserArticlesSchema),
  getUserById,
);

router.get(
  "/api/users/:userId/stories",
  celebrate(userIdParamSchema),
  getStoriesByUserId,
);

export default router;
