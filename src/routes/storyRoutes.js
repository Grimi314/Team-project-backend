import { Router } from "express";
import { celebrate } from "celebrate";

import { getArticles, getStoryById } from "../controllers/storyController.js";
import { getArticlesSchema } from "../validations/storyValidation.js";

const storyRouter = Router();

storyRouter.get("/api/articles", celebrate(getArticlesSchema), getArticles);
storyRouter.get("/stories/:storyId", getStoryById);

export default storyRouter;
