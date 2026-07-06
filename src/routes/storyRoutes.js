import { celebrate } from "celebrate";
import { getArticlesSchema, storyIdParamSchema } from "../validations/storyValidation";
import { objectIdValidator } from "../validations/userValidation.js"
import { Router } from "express";
import { celebrate } from "celebrate";
import { getStoryById, addSavedStory, removeSavedStory } from "../controllers/storyController.js";
import { authenticate } from "../middleware/authenticate.js"; 

const storyRouter = Router();

router.get("/api/articles", celebrate(getArticlesSchema), getArticles);

storyRouter.get(
  "/stories/:stortId",
  celebrate(objectIdValidator),
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