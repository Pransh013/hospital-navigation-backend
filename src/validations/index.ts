import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(8001),
  AWS_REGION: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  DYNAMODB_TABLE_PATIENTS: z.string().min(1),
  JWT_SECRET: z.string().min(1),
});

export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type SigninInput = z.infer<typeof signinSchema>;
