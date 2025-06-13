import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const { statusCode = 500, message = "Internal Server Error", errors } = err;
  res.status(statusCode).json(errors ? { message, errors } : { message });
};

export default errorHandler;
