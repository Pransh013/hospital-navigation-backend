import express from "express";
import { patientTestController } from "../controllers/patientTestController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, patientTestController.getPatientTests);
router.patch(
  "/:id/complete",
  authMiddleware,
  patientTestController.markTestCompleted
);

export { router as patientTestRouter };
