import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticate } from "../midelware/authenticate.js";
import { logoutUser, getCurrentUser } from "../controllers/authController.js";

const router = Router();

// TODO (п.1 ТЗ): router.post('/auth/register', ...); router.post('/auth/login', ...)
// TODO (п.2 ТЗ, сесії): router.post('/auth/refresh', ...)

router.post("/auth/logout", authenticate, ctrlWrapper(logoutUser));
router.get("/auth/current", authenticate, ctrlWrapper(getCurrentUser));

export default router;
