import { NextFunction, Request, Response } from "express";
import { getPatientByEmail } from "../services/patientService";
import { signinSchema } from "../validations";
import { generateToken, isValidPassword } from "../utils";

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = signinSchema.safeParse(req.body);
  if (!result.success) {
    const err: any = new Error("Validation Error");
    err.statusCode = 400;
    err.errors = result.error.flatten();
    return next(err);
  }
  try {
    const { email, password } = result.data;
    const patient = await getPatientByEmail(email);
    if (!(await isValidPassword(password, patient.passwordHash))) {
      const error: any = new Error("Incorrect password");
      error.statusCode = 401;
      return next(error);
    }
    const token = await generateToken(patient);
    console.log(`Patient signed in: ${email}`);
    res.status(200).json({ message: "Patient signed in successfully", token });
  } catch (error) {
    next(error);
  }
};
