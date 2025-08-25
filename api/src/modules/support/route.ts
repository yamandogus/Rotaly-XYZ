import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { SupportController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { verifiedUser, isAdmin } from "../../middleware/auth.middleware";

const router = Router();
const prisma = new PrismaClient();
const supportController = new SupportController(prisma);

// Public endpoint - AI status check (no auth required)
router.get("/ai-status", supportController.isAIServiceAvailable);

// apply auth middleware and email verification to protected routes
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

// AI Chat endpoint (requires auth)
router.post("/ai-chat", supportController.handleAIChat);

export default router;
