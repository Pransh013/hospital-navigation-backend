import "dotenv/config";

import { envSchema } from "@/lib/index.js";

const { success, data, error } = envSchema.safeParse(process.env);
if (!success) {
  console.error(
    "❌ Invalid environment variables:",
    error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export const env = data;
