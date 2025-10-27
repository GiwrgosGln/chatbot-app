import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

export const createApp = (): Application => {
  const app = express();

  // middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // health check
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // database check
  app.get("/health/db", async (req: Request, res: Response) => {
    try {
      const { getPool } = await import("./config/database.config");
      const pool = getPool();
      const result = await pool.query("SELECT 1 AS health");

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
  });

  // root
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "Chatbot Service API",
      version: "1.0.0",
      endpoints: {
        health: "/health",
        databaseHealth: "/health/db",
      },
    });
  });

  return app;
};
