import { patientRepository } from "../repositories/patientRepository";
import { generateToken, isValidPassword } from "../utils";

export const patientService = {
  signin: async (
    email: string,
    password: string
  ): Promise<{ token: string }> => {
    const patient = await patientRepository.findByEmail(email);

    if (!(await isValidPassword(password, patient.passwordHash))) {
      const error: any = new Error("Incorrect password");
      error.statusCode = 401;
      throw error;
    }

    const token = await generateToken(patient);
    return { token };
  },
};
