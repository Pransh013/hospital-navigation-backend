import { patientRepository } from "../repositories/patientRepository";
import { TokenPayload } from "../types";
import { generateToken, isValidPassword } from "../utils";

export const patientService = {
  signin: async (
    email: string,
    password: string
  ): Promise<{ token: string; user: TokenPayload }> => {
    const patient = await patientRepository.findByEmail(email);

    if (!(await isValidPassword(password, patient.passwordHash))) {
      const error: any = new Error("Incorrect password");
      error.statusCode = 401;
      throw error;
    }

    const tokenPayload: TokenPayload = {
      patientId: patient.patientId,
      firstName: patient.firstName,
      email: patient.email,
      hospitalId: patient.hospitalId,
    };

    const token = await generateToken(tokenPayload);

    return {
      token,
      user: tokenPayload,
    };
  },
};
