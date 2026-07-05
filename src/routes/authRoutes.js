import { Router } from 'express';

import { refreshUserSession } from '../controllers/authController.js';

const router = Router();

router.post('/refresh', refreshUserSession);

export default router;
