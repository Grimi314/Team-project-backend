import { Router } from "express";
import { celebrate } from "celebrate";
import { getUserById } from "../controllers/userController.js";
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

export default router;
