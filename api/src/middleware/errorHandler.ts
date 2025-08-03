import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AppError } from "../utils/appError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    const message = `Validation error: ${err.issues
      .map((issue) => issue.message)
      .join(", ")}`;
    return res.status(400).json({
      message: message,
    });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    let statusCode = 500;
    let message = "Internal Server Error";

    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = `Duplicate field value: ${err.meta?.target}`;
        break;
      case "P2025":
        statusCode = 404;
        message = `Record not found: ${
          err.meta?.cause || "The requested record could not be found."
        }`;
        break;

      default:
        message = `Database error: ${err.message}`;
    }
    res.status(statusCode).json({
      message: message,
    });
    return;
  }

  console.error("UNHANDLED ERROR ", err);

  res.status(500).json({
    message: "Something went wrong!",
  });
};
