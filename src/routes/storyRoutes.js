import { celebrate } from "celebrate";
import { getArticlesSchema, storyIdParamSchema } from "../validations/storyValidation.js";
import { objectIdValidator } from "../validations/userValidation.js"
import { Router } from "express";
import { getStoryById, addSavedStory, removeSavedStory } from "../controllers/storyController.js";
import { authenticate } from "../middleware/authenticate.js"; 
import { getArticles } from "../controllers/storyController.js"

const storyRouter = Router();

storyRouter.get("/api/articles", celebrate(getArticlesSchema), getArticles);

storyRouter.get(
  "/stories/:stortId",
  celebrate(storyIdParamSchema),
  getStoryById,
);

storyRouter.post(
  "/api/stories/:storyId/saved",
  authenticate,
  celebrate(storyIdParamSchema),
  addSavedStory
);

storyRouter.delete(
  "/api/stories/:storyId/saved",
  authenticate,
  celebrate(storyIdParamSchema),
  removeSavedStory 
);

export default storyRouter;