import express from "express";
import { signinController } from "../controllers/patientController";

const router = express.Router();

router.post("/signin", signinController);

export { router as patientRouter };
