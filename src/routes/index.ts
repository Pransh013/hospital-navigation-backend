import express from "express";
import { patientRouter } from "./patientRoutes";

const router = express.Router();

router.use("/auth", patientRouter);

export default router;
