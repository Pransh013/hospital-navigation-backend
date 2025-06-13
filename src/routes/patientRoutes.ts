import express from "express";
import { patientController } from "../controllers/patientController";

const router = express.Router();

router.post("/signin", patientController.signin);

export { router as patientRouter };
