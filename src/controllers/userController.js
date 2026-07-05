import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { Story } from "../models/story.js";

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page);
  const perPage = parseInt(req.query.perPage);
  const skip = (page - 1) * perPage;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, "Такий користувач відсутній");
  }

  // const stories = await Story.find({ ownerId: userId })
  //   .select("img title ownerId")
  //   .populate("ownerId", "name savedArticles");

  const [totalItems, articles] = await Promise.all([
    Story.countDocuments({ ownerId: userId }),
    Story.find({ ownerId: userId })
      .select("img title ownerId")
      .populate("ownerId", "name savedArticles")
      .skip(skip)
      .limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    user,
    articles,
    pagination: {
      page,
      perPage,
      totalItems,
      totalPages,
    },
  });
};
