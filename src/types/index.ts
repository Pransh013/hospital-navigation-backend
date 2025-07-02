import { z } from "zod";
import { Patient } from "../models/patient";
import { signinSchema } from "../validations";
import { PatientTest } from "../models/patientTest";
import { Doctor } from "../models/doctor";
import { BookingSlot } from "../models/bookingSlot";

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
