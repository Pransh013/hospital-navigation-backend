import { z } from "zod";
import { Patient } from "../models/patient";
import { signinSchema } from "../validations";

export type TokenPayload = Pick<
  Patient,
  "patientId" | "firstName" | "email" | "hospitalId"
>;

export type SigninInput = z.infer<typeof signinSchema>;
