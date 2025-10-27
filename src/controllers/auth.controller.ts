import { Request, Response, NextFunction } from "express";

export const getCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.oidc?.isAuthenticated()) {
      res.json({
        authenticated: true,
        user: req.oidc.user,
      });
    } else {
      res.json({
        authenticated: false,
        user: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      success: true,
      user: req.oidc?.user,
      message: "User profile retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      success: true,
      message: "Welcome to your dashboard!",
      user: req.oidc?.user,
      chatbots: [],
    });
  } catch (error) {
    next(error);
  }
};
