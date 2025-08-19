import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { SupportController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { verifiedUser } from "../../middleware/auth.middleware";
import { validateBody } from "../../middleware/validate.middleware";
import {
  CreateSupportSchema,
  GetSupportListSchema,
  CloseSupportSchema,
} from "../../dto/support";

const router = Router();
const prisma = new PrismaClient();
const supportController = new SupportController(prisma);

// apply auth middleware and email verification to all routes
router.use(authenticateToken);
router.use(verifiedUser);

// support req routes
router.post(
  "/",
  validateBody(CreateSupportSchema),
  supportController.createSupportRequest
);

router.get("/", supportController.getSupportList);

router.get("/:supportId", supportController.getSupportById);

router.patch("/:supportId/close", supportController.closeSupportRequest);

// admin only routes
router.patch("/:supportId/assign", supportController.assignSupportRep);

router.get(
  "/rep/:supportRepId/workload",
  supportController.getSupportRepWorkload
);

router.post("/reassign-orphaned", supportController.reassignOrphanedSupports);

// AI chat routes
router.post("/ai/chat", supportController.handleAIChat);

router.get("/ai/status", supportController.checkAIServiceStatus);

export default router;
