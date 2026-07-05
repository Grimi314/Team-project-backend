import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import { getArticlesSchema } from "../validations/storyValidation.js";
import { objectIdValidator } from "../validations/storyValidation.js";
import { createStorySchema } from "../validations/storyValidation.js";

import { getArticles } from "../controllers/storyController.js";
import { getStoryById } from "../controllers/storyController.js";
import { createStoryController } from "../controllers/storyController.js";
import { upload } from "../middleware/multer.js";
import { authenticate } from "../middleware/authenticate.js";

const storyRouter = Router();

storyRouter.get("/api/articles", celebrate(getArticlesSchema), getArticles);

storyRouter.get(
  "/stories/:storyId",
  celebrate(objectIdValidator),
  getStoryById,
);

storyRouter.post(
    "/api/stories",
    authenticate,
    upload.single("img"),
    celebrate({
        [Segments.BODY]: createStorySchema,
    }),
    createStoryController
);

export default storyRouter;

