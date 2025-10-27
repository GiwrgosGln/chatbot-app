import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { auth } from "express-openid-connect";
import { authConfig } from "./config/auth.config";
import routes from "./routes";
import { errorHandler, notFound } from "./middleware/error.middleware";

export const createApp = (): Application => {
  const app = express();

  // Basic middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize Auth0
  app.use(auth(authConfig));

  // Middleware
  app.use((req: any, res: any, next: any) => {
    res.locals.user = req.oidc?.user;
    next();
  });

  // Root endpoint
  app.get("/", (req: any, res: Response) => {
    res.json({
      message: "Chatbot Service API",
      version: "1.0.0",
      user: req.oidc?.user || null,
      isAuthenticated: req.oidc?.isAuthenticated() || false,
      endpoints: {
        health: "/api/health",
        auth: "/api/auth",
        chatbots: "/api/chatbots",
        login: "/login",
        logout: "/logout",
      },
    });
  });

  // API routes
  app.use("/api", routes);

  // Error handling
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
