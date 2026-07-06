import { Router } from "express";
import { celebrate } from "celebrate";

import {
  getArticles,
  getStoryById,
  getStoriesByUserId,
} from "../controllers/storyController.js";
import { getArticlesSchema } from "../validations/storyValidation.js";

const storyRouter = Router();

storyRouter.get("/api/articles", celebrate(getArticlesSchema), getArticles);
storyRouter.get("/stories/:storyId", getStoryById);
storyRouter.get("/users/:userId/stories", getStoriesByUserId);

export default storyRouter;
