import { Router } from "express";
import { celebrate, Segments } from "celebrate";

import { getArticlesSchema } from "../validations/storyValidation.js";
import {
  createStorySchema,
  getAllStoriesSchema,
  popularStoriesSchema,
} from "../validations/storyValidation.js";

import {
  getArticles,
  getAllStories,
  getPopularStories,
} from "../controllers/storyController.js";
import { getStoryById } from "../controllers/storyController.js";
import { createStoryController } from "../controllers/storyController.js";

import { upload } from "../middleware/multer.js";
import { authenticate } from "../middleware/authenticate.js";

const storyRouter = Router();

storyRouter.get("/api/articles", celebrate(getArticlesSchema), getArticles);
storyRouter.get("/stories/:storyId", getStoryById);
storyRouter.post(
  "/api/stories",
  authenticate,
  upload.single("img"),
  celebrate({
    [Segments.BODY]: createStorySchema,
  }),
  createStoryController,
);
storyRouter.get("/", celebrate(getAllStoriesSchema), getAllStories);
storyRouter.get("/popular", celebrate(popularStoriesSchema), getPopularStories);

export default storyRouter;
