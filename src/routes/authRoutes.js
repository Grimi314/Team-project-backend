import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../midelware/authenticate.js';
import { logoutUser, getCurrentUser } from '../controllers/authController.js';
import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';
import { getCurrentUserController } from '../controllers/authController.js';

const router = Router();

// TODO (п.1 ТЗ): router.post('/auth/register', ...); router.post('/auth/login', ...)
// TODO (п.2 ТЗ, сесії): router.post('/auth/refresh', ...)

router.post('/auth/logout', authenticate, ctrlWrapper(logoutUser));
router.get('/auth/current', authenticate, ctrlWrapper(getCurrentUser));
router.post('/refresh', refreshUserSession);
router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/auth/logout', logoutUser);
router.post('/auth/refresh', refreshUserSession);
router.get('/users/me', authenticate, getCurrentUserController);

export default router;
