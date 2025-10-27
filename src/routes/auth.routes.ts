import { Router } from "express";
import {
  getCurrentUser,
  getUserProfile,
  getDashboard,
} from "../controllers/auth.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = Router();

router.get("/user", getCurrentUser);
router.get("/profile", authenticateUser, getUserProfile);
router.get("/dashboard", authenticateUser, getDashboard);

export default router;
