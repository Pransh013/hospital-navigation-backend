import { patientRepository } from "../repositories/patientRepository.js";
import { TokenPayload } from "../types/index.js";
import { generateToken, isValidPassword } from "../utils/index.js";

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
