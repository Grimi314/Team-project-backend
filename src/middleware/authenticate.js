import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';


export const authenticate = async (req, res, next) => {
    const { accessToken, sesionId } = req.cookies;

    if (!accessToken || !sesionId) {
      return next(createHttpError(401, 'Session cookies messing'));
    }

    const session = await Session.findOne({ _id: sesionId, accessToken });

    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    const isAccessTokenExpired = session.accessTokenValidUntil < new Date();
    if (isAccessTokenExpired) {
      return next(createHttpError(401, 'Access token expired'));
    }

    const user = await User.findById(session.userId);
    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    req.user = user;

    next();
};
