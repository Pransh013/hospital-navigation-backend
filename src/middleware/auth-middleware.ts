import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { verifyToken, AppError } from "../lib/index.js";

declare global {
  namespace Express {
    interface Request {
      patient: {
        id: string;
        hospitalId: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    const error = new AppError("No token provided", StatusCodes.UNAUTHORIZED);
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  const payload = await verifyToken(token);

  req.patient = {
    id: payload.id,
    hospitalId: payload.hospitalId,
  };

  next();
};
