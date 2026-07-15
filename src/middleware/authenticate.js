import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  //const { sessionId, accessToken } = req.cookies;
  // 1. Спочатку пробуємо взяти значення з кук
  let accessToken = req.cookies.accessToken;
  let sessionId = req.cookies.sessionId;

  // 2. Якщо кук немає, але є заголовок Authorization (це запит від Swagger)
  const authHeader = req.headers.authorization;
  if (!accessToken && authHeader && authHeader.startsWith('Bearer ')) {
    const tokenValue = authHeader.split(' ')[1]; // отримуємо чистий рядок токену

    // Якщо у Swagger ви ввели "accessToken:sessionId", розбиваємо їх за двокрапкою
    if (tokenValue.includes(':')) {
      const parts = tokenValue.split(':');
      accessToken = parts[0];
      sessionId = parts[1];
    } else {
      // Якщо ввели один токен, пробуємо знайти сесію в базі тільки за accessToken
      accessToken = tokenValue;
    }
  }
  if (!accessToken) {
    return next(createHttpError(401, 'Missing access token'));
  }

  // if (!sessionId) {
  //   return next(createHttpError(401, 'Session not found'));
  // }

  //const session = await Session.findOne({ _id: sessionId, accessToken });
  // Шукаємо сесію в базі даних
  let session;
  if (sessionId) {
    // Якщо є sessionId (з кук або Swagger), шукаємо за двома полями
    session = await Session.findOne({ _id: sessionId, accessToken });
  } else {
    // Якщо є тільки accessToken (Swagger), шукаємо сесію суто за ним
    session = await Session.findOne({ accessToken });
  }

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'Користувача не знайдено'));
  }

  req.user = user;
  req.session = session;

  next();
};
