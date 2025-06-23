import { NextFunction, Request, Response } from "express";
import { patientTestService } from "../services/patientTestService";

export const patientTestController = {
  getPatientTests: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientId = req.patient?.patientId;
      if (!patientId) {
        return next(new Error("Patient not authenticated"));
      }
      const tests = await patientTestService.getPatientTests(patientId);
      res.status(200).json({ tests });
    } catch (error) {
      next(error);
    }
  },

  markTestCompleted: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const updated = await patientTestService.markTestCompleted(id);
      res
        .status(200)
        .json({ message: "Test marked as completed", status: updated.status });
    } catch (error) {
      next(error);
    }
  },
};
