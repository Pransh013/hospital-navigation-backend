import type { Request, Response } from "express";

import { successResponse } from "@/lib/index.js";
import { PatientService } from "@/services/index.js";
import { format } from "date-fns";

export const PatientController = {
  signin: async (req: Request, res: Response) => {
    const { patient, token } = await PatientService.signin(req.body);
    return successResponse(res, { patient, token }, "Signed-in successfully.");
  },

  getBookings: async (req: Request, res: Response) => {
    const { patient } = req as Request;
    const date = (req.query.date as string) ?? format(new Date(), "yyyy-MM-dd");
    const bookings = await PatientService.getBookings(patient.id, date);
    return successResponse(res, bookings, "Bookings fetched successfully.");
  },

  checkIn: async (req: Request, res: Response) => {
    const { patientId } = req.params;

    const assignedTest = await PatientService.checkIn(patientId);
    return successResponse(
      res,
      assignedTest,
      "Check-in successful. Your first test has been assigned."
    );
  },
};
