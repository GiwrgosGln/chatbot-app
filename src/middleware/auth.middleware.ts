import { Request, Response, NextFunction } from "express";
import { requiresAuth } from "express-openid-connect";

export const authenticateUser = requiresAuth();

export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // For routes where auth is optional
  next();
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.oidc?.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication required" });
  }

  // Add admin role check here when you implement roles
  next();
};
