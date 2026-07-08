import { getRecommendedStories } from "../services/stories.js";

export const getRecommendedStoriesController = async (req, res) => {
  const result = await getRecommendedStories(req.query);

  res.status(200).json(result);
};
