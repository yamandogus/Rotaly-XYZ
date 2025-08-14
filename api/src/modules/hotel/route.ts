import { Router } from "express";
import { Request, Response } from "express";
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

// Hotel CRUD Routes
router.post("/", createHotelHandler);
router.get("/", getHotelsHandler);
router.get("/:id", getHotelByIdHandler);
router.put("/:id", updateHotelHandler);
router.delete("/:id", deleteHotelHandler);

// 🟢 Yorum sistemi endpoint'leri
// Belirli bir otel için yorum ekleme
router.post("/:hotelId/comments", createCommentHandler);

// Belirli bir otelin yorumlarını getirme
router.get("/:hotelId/comments", getCommentsByHotelHandler);

// Yorum güncelleme
router.put("/comments/:commentId", updateCommentHandler);

// Yorum silme
router.delete("/comments/:commentId", deleteCommentHandler);

// Hotel Dashboard Routes
router.get("/dashboard/hotel", (req: Request, res: Response) => {
  res.json({ message: "Hotel Dashboard" });
});

router.get("/dashboard/hotel/company", (req: Request, res: Response) => {
  res.json({ message: "Company Information" });
});

router.get("/dashboard/hotel/hotel-info", (req: Request, res: Response) => {
  res.json({ message: "Hotel Information" });
});

router.get("/dashboard/hotel/profile", (req: Request, res: Response) => {
  res.json({ message: "Hotel Profile" });
});

router.get("/dashboard/hotel/reservations", (req: Request, res: Response) => {
  res.json({ message: "Reservations" });
});

export default router;
