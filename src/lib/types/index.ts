import { z } from "zod";
import { signinSchema } from "../index.js";

export type SigninType = z.infer<typeof signinSchema>;

export type TokenPayload = {
  id: string;
  hospitalId: string;
};
