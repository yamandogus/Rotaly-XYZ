
import { Router } from "express";
import {
  createRoomHandler,
  getRoomByIdHandler,
  getRoomsByHotelHandler,
  updateRoomHandler,
  deleteRoomHandler,
} from "./controller";

const router = Router();

router.get("/hotel/:hotelId", getRoomsByHotelHandler);

router.get("/:id", getRoomByIdHandler);

router.post("/", /* ...mustBeOwnerOrAdmin, */ createRoomHandler);

router.put("/:id", /* ...mustBeOwnerOrAdmin, */ updateRoomHandler);

router.delete("/:id", /* ...mustBeOwnerOrAdmin, */ deleteRoomHandler);

export default router;
