import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = err;

  console.error("Error:", err);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message:
      process.env.NODE_ENV === "production" ? "Something went wrong!" : message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`) as AppError;
  error.statusCode = 404;
  next(error);
};
