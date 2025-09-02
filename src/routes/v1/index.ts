import express from "express";

import { hospitalRoutes } from "./hospital-routes.js";
import { patientRoutes } from "./patient-routes.js";

const router = express.Router();

router.use("/hospital", hospitalRoutes);

router.use("/patient", patientRoutes);

export { router as v1Routes };
