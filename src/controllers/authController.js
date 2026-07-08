<<<<<<< HEAD
import { Session } from "../models/session.js";

// TODO (п.1 ТЗ, реєстрація/логін): registerUser, loginUser
// TODO (п.2 ТЗ, сесії): refreshUserSession

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie("sessionId");
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(204).send();
};

export const getCurrentUser = async (req, res) => {
  // req.user вже підвантажений мідлваром authenticate
  // (User.toJSON сам прибирає password з відповіді)
  res.status(200).json(req.user);
=======
import createHttpError from 'http-errors';

import { Session } from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, 'Missing session credentials');
  }

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = session.refreshTokenValidUntil < new Date();

  if (isSessionTokenExpired) {
    await session.deleteOne();

    res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    throw createHttpError(401, 'Session token expired');
  }

  await session.deleteOne();

  const newSession = await createSession(session.userId);

  setSessionCookies(res, newSession);

  res.status(200).json({
    message: 'Session refreshed',
  });
>>>>>>> 85fab6f23b6f5d2adc7a8668559cbf28da14e53f
};
