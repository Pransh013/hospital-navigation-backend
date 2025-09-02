import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(8001),
  JWT_SECRET: z.string().min(1),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DATABASE_URL: z.string().url(),
});

export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
  hospitalId: z.string().min(1, { message: "Hospital ID is required." }),
});
