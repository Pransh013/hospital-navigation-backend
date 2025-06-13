import { NextFunction, Request, Response } from "express";
import { patientTestService } from "../services/patientTestService";

export const patientTestController = {
  getPatientTests: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientId = req.patient.patientId;
      const tests = await patientTestService.getPatientTests(patientId);
      res.status(200).json({ tests });
    } catch (error) {
      next(error);
    }
  },
};
