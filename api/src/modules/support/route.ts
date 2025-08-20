import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { SupportController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { verifiedUser, isAdmin } from "../../middleware/auth.middleware";

const router = Router();
const prisma = new PrismaClient();
const supportController = new SupportController(prisma);

// apply auth middleware and email verification to all routes
router.use(authenticateToken);
router.use(verifiedUser);

// support req routes
router.post("/", supportController.createSupportRequest);

router.get("/", supportController.getSupportList);

router.get("/:supportId", supportController.getSupportById);

router.patch("/:supportId/close", supportController.closeSupportRequest);

// admin only - get statistics for all support representatives
router.get(
  "/statistics/reps",
  isAdmin,
  supportController.getSupportRepStatistics
);

// AI chat routes
router.post("/ai/chat", supportController.handleAIChat);

router.get("/ai/status", supportController.checkAIServiceStatus);

export default router;
