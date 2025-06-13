import express from "express";
import { patientRouter } from "./patientRoutes";
import { patientTestRouter } from "./patientTestRoutes";

const router = express.Router();

router.use("/auth", patientRouter);
router.use("/tests", patientTestRouter);

export default router;
