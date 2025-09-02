import cron from "cron";
import https from "https";

import { env } from "./env.js";
import { logger } from "./index.js";

export const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(env.API_URL, (res) => {
      if (res.statusCode === 200) logger.info("GET request sent successfully");
      else logger.error("GET request failed", res.statusCode);
    })
    .on("error", (e) => logger.error("Error while sending request", e));
});

