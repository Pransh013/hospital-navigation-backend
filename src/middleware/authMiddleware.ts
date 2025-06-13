import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      const error: any = new Error("No token provided");
      error.statusCode = 401;
      return next(error);
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);

    req.patient = payload;
    next();
  } catch (error) {
    const err: any = new Error("Invalid token");
    err.statusCode = 401;
    next(err);
  }
};
