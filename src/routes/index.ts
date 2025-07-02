import express from "express";
import { patientRouter } from "./patientRoutes.js";
import { patientTestRouter } from "./patientTestRoutes.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/", patientRouter);
router.use("/tests", authMiddleware, patientTestRouter);

export default router;
