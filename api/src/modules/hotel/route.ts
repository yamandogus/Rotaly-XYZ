import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

// Admin Dashboard Routes
router.get("/dashboard", (req: Request, res: Response) => {
  res.json({ message: "Admin Dashboard" });
});

router.get("/dashboard/admin", (req: Request, res: Response) => {
  res.json({ message: "Admin Dashboard" });
});

router.get("/dashboard/admin/admins", (req: Request, res: Response) => {
  res.json({ message: "Admin Management" });
});

router.get("/dashboard/admin/company", (req: Request, res: Response) => {
  res.json({ message: "Company Management" });
});

router.get("/dashboard/admin/customers", (req: Request, res: Response) => {
  res.json({ message: "Customer Management" });
});

router.get("/dashboard/admin/hotels", (req: Request, res: Response) => {
  res.json({ message: "Hotel Management" });
});

router.get("/dashboard/admin/profile", (req: Request, res: Response) => {
  res.json({ message: "Admin Profile" });
});

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

// Admin API Routes
router.get("/admin/dashboard", (req: Request, res: Response) => {
  res.json({ message: "Admin Dashboard Data" });
});

router.get("/admin/users", (req: Request, res: Response) => {
  res.json({ message: "All Users" });
});

router.get("/admin/users/:id", (req: Request, res: Response) => {
  res.json({ message: "User Details", id: req.params.id });
});

router.put("/admin/users/:id", (req: Request, res: Response) => {
  res.json({ message: "User Updated", id: req.params.id });
});

router.delete("/admin/users/:id", (req: Request, res: Response) => {
  res.json({ message: "User Deleted", id: req.params.id });
});

router.get("/admin/hotels", (req: Request, res: Response) => {
  res.json({ message: "All Hotels" });
});

router.get("/admin/hotels/:id", (req: Request, res: Response) => {
  res.json({ message: "Hotel Details", id: req.params.id });
});

router.put("/admin/hotels/:id", (req: Request, res: Response) => {
  res.json({ message: "Hotel Updated", id: req.params.id });
});

router.delete("/admin/hotels/:id", (req: Request, res: Response) => {
  res.json({ message: "Hotel Deleted", id: req.params.id });
});

// Owner API Routes
router.get("/owner/dashboard", (req: Request, res: Response) => {
  res.json({ message: "Owner Dashboard Data" });
});

router.get("/owner/hotels/:id", (req: Request, res: Response) => {
  res.json({ message: "Hotel Information", id: req.params.id });
});

router.put("/owner/hotels/:id", (req: Request, res: Response) => {
  res.json({ message: "Hotel Updated", id: req.params.id });
});

router.post("/owner/hotels/:id/rooms", (req: Request, res: Response) => {
  res.json({ message: "Room Created", hotelId: req.params.id });
});

router.put("/owner/hotels/:id/rooms/:roomId", (req: Request, res: Response) => {
  res.json({ message: "Room Updated", hotelId: req.params.id, roomId: req.params.roomId });
});

router.delete("/owner/hotels/:id/rooms/:roomId", (req: Request, res: Response) => {
  res.json({ message: "Room Deleted", hotelId: req.params.id, roomId: req.params.roomId });
});

router.get("/owner/reservations", (req: Request, res: Response) => {
  res.json({ message: "All Reservations" });
});

router.get("/owner/reservations/:id", (req: Request, res: Response) => {
  res.json({ message: "Reservation Details", id: req.params.id });
});

router.post("/owner/reservations/:id/approve", (req: Request, res: Response) => {
  res.json({ message: "Reservation Approved", id: req.params.id });
});

router.post("/owner/reservations/:id/reject", (req: Request, res: Response) => {
  res.json({ message: "Reservation Rejected", id: req.params.id });
});

router.get("/owner/reports/revenue", (req: Request, res: Response) => {
  res.json({ message: "Revenue Report" });
});

router.get("/owner/reports/reservations", (req: Request, res: Response) => {
  res.json({ message: "Reservation Report" });
});

export default router;