import { Request, Response } from "express";
import { AccountService } from "./service";

export class AccountController {
  static async getUserAccounts(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized or user ıd not found" });
      }

      const accounts = await AccountService.findByUserId(userId);
      res
        .status(200)
        .json({ message: "Accounts fetched successfully", data: accounts });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
