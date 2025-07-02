import express from "express";
import { patientTestController } from "../controllers/patientTestController.js";

const router = express.Router();

router.get("/", patientTestController.getPatientTests);
router.patch("/:id/complete", patientTestController.markTestCompleted);

export { router as patientTestRouter };
