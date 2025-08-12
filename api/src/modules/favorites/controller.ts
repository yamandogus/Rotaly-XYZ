import { Request, Response } from "express";
import { FavoritesService } from "./service";

export class FavoritesController {
  static async getFavorites(req: Request, res: Response) {
    try {
      const user = (req as any).user?.id;
      const favorites = await FavoritesService.getFavorites(user);
      res.status(200).json({
        status: "success",
        message: "Favorites fetched successfully",
        data: favorites,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  }

  static async toggleFavorite(req: Request, res: Response) {
    try {
      const user = (req as any).user?.id;
      const { hotelId } = req.params;
      const favorite = await FavoritesService.toggleFavorite(user, hotelId);
      res.status(200).json({
        status: "success",
        message: "Favorite toggled successfully",
        data: favorite,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  }
}
