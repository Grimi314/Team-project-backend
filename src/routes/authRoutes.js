import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  getCurrentUserController,
} from '../controllers/authController.js';

import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

import { authenticate } from '../middleware/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/auth/register',
  celebrate(registerUserSchema),
  ctrlWrapper(registerUser),
);
router.post('/auth/login', celebrate(loginUserSchema), ctrlWrapper(loginUser));
router.post('/auth/logout', authenticate, ctrlWrapper(logoutUser));
router.post('/auth/refresh', ctrlWrapper(refreshUserSession));
router.get('/users/me', authenticate, ctrlWrapper(getCurrentUserController));

export default router;
