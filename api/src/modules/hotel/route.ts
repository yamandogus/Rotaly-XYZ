import { Router } from "express";
import { Request, Response } from "express";
import { authenticateToken } from "../../middleware/jwt.middleware";
import {
  createHotelHandler,
  getHotelsHandler,
  getHotelByIdHandler,
  updateHotelHandler,
  deleteHotelHandler,
  createCommentHandler,
  getCommentsByHotelHandler,
  updateCommentHandler,
  deleteCommentHandler,
} from "./controller";
const router = Router();
// Hotel CRUD Routes - Authentication gerekli
router.post("/", authenticateToken, createHotelHandler);
router.get("/", getHotelsHandler); // Public endpoint
router.get("/:id", getHotelByIdHandler); // Public endpoint
router.put("/:id", authenticateToken, updateHotelHandler);
router.delete("/:id", authenticateToken, deleteHotelHandler);
// :large_green_circle: Yorum sistemi endpoint'leri - Authentication gerekli
router.post("/:hotelId/comments", authenticateToken, createCommentHandler);
router.get("/:hotelId/comments", getCommentsByHotelHandler); // Public endpoint
router.put("/comments/:commentId", authenticateToken, updateCommentHandler);
router.delete("/comments/:commentId", authenticateToken, deleteCommentHandler);
// Hotel Dashboard Routes - Authentication gerekli
router.get("/dashboard/hotel", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Hotel Dashboard" });
});
router.get("/dashboard/hotel/company", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Company Information" });
});
router.get("/dashboard/hotel/hotel-info", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Hotel Information" });
});
router.get("/dashboard/hotel/profile", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Hotel Profile" });
});
router.get("/dashboard/hotel/reservations", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Reservations" });
});
export default router;