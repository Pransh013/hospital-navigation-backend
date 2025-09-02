import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodType } from "zod";

import { errorResponse } from "@/lib/index.js";
import { logger } from "@/config/logger.js";

export const validateSchema =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = schema.safeParse(req.body);
    logger.info(`${success}-${data}-${error}`);
    if (!success) {
      const messages = error.issues.map(
        (issue) => `${issue.path}: ${issue.message}`
      );
      return errorResponse(res, messages, StatusCodes.BAD_REQUEST);
    }
    req.body = data;
    return next();
  };
