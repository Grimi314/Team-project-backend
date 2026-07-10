import { User } from '../models/user.js';

export const getTravellers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;
  const skip = (page - 1) * perPage;

  const filter = { articlesAmount: { $gt: 0 } };

  const travellersQuery = User.find(filter)
    .select('-password -email -updatedAt -createdAt')
    .sort({ articlesAmount: -1 });

  const [users, totalStories] = await Promise.all([
    travellersQuery.clone().skip(skip).limit(perPage),
    travellersQuery.clone().countDocuments(),
  ]);

  const totalPages = Math.ceil(totalStories / perPage);
  res.status(200).json({
    page,
    perPage,
    totalItems: totalStories,
    totalPages,
    nextPage: page < totalPages,
    previousPage: page > 1,
    users,
  });
};
