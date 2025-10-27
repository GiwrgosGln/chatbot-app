import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      oidc?: {
        isAuthenticated(): boolean;
        user?: any;
      };
    }
  }
}
