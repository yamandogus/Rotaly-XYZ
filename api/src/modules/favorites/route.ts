import { Router } from "express";
import { FavoritesController } from "./controller";

const router = Router();

router.get("/", FavoritesController.getFavorites);
router.post("/:hotelId", FavoritesController.toggleFavorite);

export default router;
