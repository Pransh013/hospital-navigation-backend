import express from "express";
import { patientRouter } from "./patientRoutes";
import { patientTestRouter } from "./patientTestRoutes";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use("/", patientRouter);
router.use("/tests", authMiddleware, patientTestRouter);

export default router;
