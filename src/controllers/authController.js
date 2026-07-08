import { Session } from '../models/session.js';

// TODO (п.1 ТЗ, реєстрація/логін): registerUser, loginUser
// TODO (п.2 ТЗ, сесії): refreshUserSession

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const getCurrentUser = async (req, res) => {
  // req.user вже підвантажений мідлваром authenticate
  // (User.toJSON сам прибирає password з відповіді)
  res.status(200).json(req.user);
};

import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { createSession, setSessionCookies } from '../services/auth.js';
import { Session } from '../models/session.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);

  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid cretentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({ userId: user._id });

  const newSession = await createSession(user._id);

  setSessionCookies(res, newSession);

  res.status(200).json(user);
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSession = async (req, res) => {
  const { sesionId, refreshToken } = req.cookies;

  if (!sesionId || !refreshToken) {
    throw createHttpError(401, 'Missing session credentioals');
  }

  const session = await Session.findOne({
    _id: sesionId,
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

  res.status(200).json({
    message: 'Session refreshed',
  });
};

export const getCurrentUserController = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};
