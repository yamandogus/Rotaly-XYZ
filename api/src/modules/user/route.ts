import { Router } from "express";
import { UserController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";

const router = Router();

// Register a new user
router.post("", UserController.add);
// GET /api/users/me/profile
router.get("/me/profile", authenticateToken, UserController.getProfile);
router.get("/", authenticateToken, UserController.index);
// GET /api/users/id/:id
router.get("/id/:id", authenticateToken, UserController.ById);
// GET /api/users/email/:email
router.get("/email/:email", authenticateToken, UserController.ByEmail);
// GET /api/users/phone/:phone
router.get("/phone/:phone", authenticateToken, UserController.ByPhone);
// PUT /api/users/:id
router.put("/:id", authenticateToken, UserController.update);
// DELETE /api/users/:id
router.delete("/:id", authenticateToken, UserController.delete);

export default router;
