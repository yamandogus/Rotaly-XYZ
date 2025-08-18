import { Router } from "express";
import {
  createReservationHandler,
  getReservationByIdHandler,
  listReservationsHandler,
  updateReservationHandler,
  deleteReservationHandler,
} from "./controller";

const router = Router();

// Not: Auth/role middleware'iniz hazırsa buraya ekleyin:
// import { requireAuth } from "../../middlewares/auth";
// router.use(requireAuth);

router.post("/", createReservationHandler);
router.get("/", listReservationsHandler);
router.get("/:id", getReservationByIdHandler);
router.patch("/:id", updateReservationHandler);
router.delete("/:id", deleteReservationHandler);

export default router;
