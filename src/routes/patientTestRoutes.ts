import express from "express";
import { patientTestController } from "../controllers/patientTestController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, patientTestController.getPatientTests);

export { router as patientTestRouter };
