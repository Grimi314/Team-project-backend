<<<<<<< HEAD
import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticate } from "../midelware/authenticate.js";
import { logoutUser, getCurrentUser } from "../controllers/authController.js";

const router = Router();

// TODO (п.1 ТЗ): router.post('/auth/register', ...); router.post('/auth/login', ...)
// TODO (п.2 ТЗ, сесії): router.post('/auth/refresh', ...)

router.post("/auth/logout", authenticate, ctrlWrapper(logoutUser));
router.get("/auth/current", authenticate, ctrlWrapper(getCurrentUser));
=======
import { Router } from 'express';

import { refreshUserSession } from '../controllers/authController.js';

const router = Router();

router.post('/refresh', refreshUserSession);
>>>>>>> 85fab6f23b6f5d2adc7a8668559cbf28da14e53f

export default router;
