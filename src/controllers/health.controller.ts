import { Request, Response, NextFunction } from "express";

export const getHealthCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    next(error);
  }
};

export const getDatabaseHealth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { getPool } = await import("../config/database.config");
    const pool = getPool();
    await pool.query("SELECT 1 AS health");

    res.status(200).json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
  }
};
