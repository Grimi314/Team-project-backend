import { Router } from "express";
import { celebrate, Segments } from "celebrate";

import { getArticlesSchema, storyIdParamSchema } from "../validations/storyValidation.js";
import { createStorySchema } from "../validations/storyValidation.js";

import { getArticles } from "../controllers/storyController.js";
import { getStoryById } from "../controllers/storyController.js";
import { createStoryController } from "../controllers/storyController.js";
import { addSavedStory, removeSavedStory } from "../controllers/storyController.js"

import { upload } from "../middleware/multer.js";
import { authenticate } from "../middleware/authenticate.js";


const storyRouter = Router();

storyRouter.get("/api/articles", celebrate(getArticlesSchema), getArticles);
storyRouter.get("/stories/:storyId", getStoryById);
storyRouter.post("/api/stories",
    authenticate,
    upload.single("img"),
    celebrate({
        [Segments.BODY]: createStorySchema,
    }),
    createStoryController
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

