import { Router } from "express";

import { getRecommendedStoriesController } from "../controllers/recommendedStoriesController.js";

const recommendedStoriesRouter = Router();

recommendedStoriesRouter.get("/recommended", getRecommendedStoriesController);

export default recommendedStoriesRouter;
