import { NextFunction, Request, Response } from "express";
import { signinSchema } from "../validations/index.js";
import { patientService } from "../services/patientService.js";
import { patientTestService } from "../services/patientTestService.js";

export const patientController = {
  signin: async (req: Request, res: Response, next: NextFunction) => {
    const result = signinSchema.safeParse(req.body);
    if (!result.success) {
      const err: any = new Error("Validation Error");
      err.statusCode = 400;
      err.errors = result.error.flatten();
      return next(err);
    }

    try {
      const { email, password } = result.data;
      const { token, user } = await patientService.signin(email, password);
      res
        .status(200)
        .json({ message: "Patient signed in successfully", token, user });
    } catch (error) {
      next(error);
    }
  },

  getConsultationSummary: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const summary = await patientTestService.getConsultationSummaryForPatient(
        id
      );
      res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  },
};
