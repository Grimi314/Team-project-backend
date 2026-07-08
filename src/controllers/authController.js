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
};
