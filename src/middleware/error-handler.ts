import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { logger } from "@/config/index.js";
import { type AppError, errorResponse } from "@/lib/index.js";

export const errorHandler = (
  err: AppError,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  logger.error(err.message);
  return errorResponse(
    res,
    err.message || "Internal server error",
    err.status || StatusCodes.INTERNAL_SERVER_ERROR
  );
};
