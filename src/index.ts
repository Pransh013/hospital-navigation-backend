import express from "express";

import { logger, job } from "./config/index.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/index.js";
import { routes } from "./routes/index.js";

const app = express();

if (env.NODE_ENV === "production") job.start();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info(`🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
