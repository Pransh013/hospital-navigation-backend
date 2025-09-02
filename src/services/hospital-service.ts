import { StatusCodes } from "http-status-codes";

import { logger } from "@/config/index.js";
import { AppError } from "@/lib/index.js";
import { HospitalRepository } from "@/repositories/index.js";

export const HospitalService = {
  getAll: async () => {
    const hospitals = await HospitalRepository.getAll();

    if (!hospitals || hospitals.length === 0) {
      throw new AppError("No active hospitals found.", StatusCodes.NOT_FOUND);
    }

    logger.info(`Found ${hospitals.length} active hospital(s).`);
    return hospitals;
  },
};
