import { Router } from "express";
import { Request, Response } from "express";

const router = Router();
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
