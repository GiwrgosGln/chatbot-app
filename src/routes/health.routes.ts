import { Router } from "express";
import {
  getHealthCheck,
  getDatabaseHealth,
} from "../controllers/health.controller";

const router = Router();

router.get("/", getHealthCheck);
router.get("/db", getDatabaseHealth);

export default router;
