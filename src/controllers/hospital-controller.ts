import type { Request, Response } from "express";

import { HospitalService } from "../services/index.js";
import { successResponse } from "../lib/index.js";

export const HospitalController = {
  getAll: async (_: Request, res: Response) => {
    const hospitals = await HospitalService.getAll();

    return successResponse(res, hospitals, "Hospitals fetched successfully.");
  },
};
