import express from "express";

import { PatientController } from "@/controllers/index.js";
import { authMiddleware, validateSchema } from "@/middleware/index.js";
import { signinSchema } from "@/lib/index.js";

const router = express.Router();

router.post("/sign-in", validateSchema(signinSchema), PatientController.signin);

router.get("/bookings", authMiddleware, PatientController.getBookings);

router.post("/:patientId/checkin", authMiddleware, PatientController.checkIn);

export { router as patientRoutes };
