import express from "express";
import { patientTestController } from "../controllers/patientTestController.js";

const router = express.Router();

router.get("/", patientTestController.getPatientTests);

export { router as patientTestRouter };
