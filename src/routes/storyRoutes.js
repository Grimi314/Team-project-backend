import { Router } from "express";
import { celebrate, Segments } from "celebrate";

import { createStoryController } from "../controllers/storyController.js";
import { createStorySchema } from "../validations/storyValidation.js";
import { upload } from "../middleware/multer.js";
import {authenticate} from "../midelware/authenticate.js";

const router = Router();

router.post(
    "/",
    authenticate,
    upload.single("img"),
    celebrate({
        [Segments.BODY]: createStorySchema,
    }),
    createStoryController
);

export default router;