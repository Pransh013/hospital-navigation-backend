import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.string().optional().default("3001").transform(Number),
  AWS_REGION: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  DYNAMODB_TABLE_USERS: z.string().min(1),
  DYNAMODB_TABLE_PATIENTS: z.string().min(1),
  DYNAMODB_TABLE_TESTS: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
