import { celebrate } from "celebrate";
import { getArticlesSchema } from "../validations/storyValidation";
import { objectIdValidator } from "../validations/storyValidation.js";
import { Router } from "express";
import { celebrate } from "celebrate";
import { getStoryById } from "../controllers/storyController.js";

const storyRouter = Router();

router.get("/api/articles", celebrate(getArticlesSchema), getArticles);

storyRouter.get(
  "/stories/:stortId",
  celebrate(objectIdValidator),
  getStoryById,
);
export default storyRouter;
