import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function successResponse<T>(
  res: Response,
  data: T,
  message = "Success",
  status = StatusCodes.OK
) {
  return res.status(status).json({ message, status, data });
}

export function errorResponse(
  res: Response,
  message: string | string[] = "Internal server error",
  status = StatusCodes.INTERNAL_SERVER_ERROR
) {
  return res.status(status).json({ message, status });
}
