import express from "express";
import { patientController } from "../controllers/patientController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/auth/signin", patientController.signin);
router.get(
  "/:id/consultation",
  authMiddleware,
  patientController.getConsultationSummary
);

export { router as patientRouter };
