import { Router } from "express";
import { AccountController } from "./controller";

const accountRouter = Router();

accountRouter.get("/accounts", AccountController.getUserAccounts);

export default accountRouter;
