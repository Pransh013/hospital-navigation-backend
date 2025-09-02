import express, { type Router } from "express";

import { v1Routes } from "./v1/index.js";

const router: Router = express.Router();

router.use("/v1", v1Routes);

export { router as routes };
