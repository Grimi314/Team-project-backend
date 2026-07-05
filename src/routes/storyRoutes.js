import { celebrate } from "celebrate";
import { getArticlesSchema } from "../validations/storyValidation";

router.get("/api/articles", celebrate(getArticlesSchema), getArticles);
