import { z } from "zod";
import { Patient } from "../models/patient.js";
import { signinSchema } from "../validations/index.js";

export type TokenPayload = Pick<
  Patient,
  "patientId" | "firstName" | "email" | "hospitalId"
>;

export type SigninInput = z.infer<typeof signinSchema>;

export type TestType = {
  patientTestId: string;
  testName: string;
  testStatus: string;
  floorNumber: number;
  roomNumber: string;
  duration: number;
  patientsInLine: number;
};

export type ConsultationSummary = {
  doctorName: string;
  doctorDesignation: string;
  slotDate: string;
  slotStartTime: string;
  slotEndTime: string;
};
