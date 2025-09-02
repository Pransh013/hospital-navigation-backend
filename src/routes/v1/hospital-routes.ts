import express from "express";

import { HospitalController } from "../../controllers/index.js";

const router = express.Router();

router.get("/", HospitalController.getAll);

export { router as hospitalRoutes };
