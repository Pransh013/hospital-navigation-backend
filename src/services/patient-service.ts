import { StatusCodes } from "http-status-codes";

import { logger } from "../config/index.js";
import { AppError, generateToken, isValidPassword } from "../lib/index.js";
import { PatientRepository } from "../repositories/index.js";
import { SigninType } from "../lib/index.js";

export const PatientService = {
  signin: async ({ email, password, hospitalId }: SigninType) => {
    const auth = await PatientRepository.findByEmail(email, hospitalId);
    // if (!auth || !(await isValidPassword(password, auth.password))) {
    if (!auth || password !== auth.password) {
      throw new AppError("Invalid credentials.", StatusCodes.UNAUTHORIZED);
    }

    const patient = await PatientRepository.findPatientById(auth.id);
    if (!patient) {
      throw new AppError("Patient data not found.", StatusCodes.NOT_FOUND);
    }

    const token = await generateToken({ id: patient.id, hospitalId });

    logger.info(`Sign-in successful for patient: ${patient.id}.`);

    return { token, patient };
  },

  getBookings: async (patientId: string, date: string) => {
    const bookings = await PatientRepository.getBookings(patientId, date);
    if (!bookings || bookings.length === 0) {
      throw new AppError(
        "No bookings found for the given date.",
        StatusCodes.NOT_FOUND
      );
    }

    logger.info(`Found ${bookings.length} bookings for patient ${patientId}.`);

    return bookings;
  },

  checkIn: async (patientId: string) => {
    // Add a new check for active tests here
    const activeTest = await PatientRepository.getPatientActiveTests(patientId);
    if (activeTest) {
      throw new AppError(
        "You are already checked in for an active test. Please complete your current test before proceeding.",
        StatusCodes.BAD_REQUEST
      );
    }

    // 1. Get all of the patient's scheduled tests for today
    const scheduledTests = await PatientRepository.getScheduledTestsByPatientId(
      patientId
    );

    if (scheduledTests.length === 0) {
      throw new AppError(
        "No eligible tests to check in for. Please ensure all your tests are scheduled for today.",
        StatusCodes.BAD_REQUEST
      );
    }

    // 2. Find the most efficient test by calculating queue times
    // ... (rest of the logic remains the same)
    let mostEfficientTest = null;
    let minWaitingTime = Infinity;

    for (const test of scheduledTests) {
      // Find the number of patients already in the queue for this room
      const patientsInQueue = await PatientRepository.getQueueSizeForRoom(
        test.test.roomNumber
      );

      // Calculate the estimated waiting time for this test/room
      const estimatedWaitingTime = patientsInQueue * test.test.durationInMins!;

      // Check if this room has a shorter waiting time than the current minimum
      if (estimatedWaitingTime < minWaitingTime) {
        minWaitingTime = estimatedWaitingTime;
        mostEfficientTest = test;
      }
    }

    // 3. Handle the case where no efficient test could be found (shouldn't happen with valid data)
    if (!mostEfficientTest) {
      throw new AppError(
        "Unable to assign a test. Please contact hospital staff.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    // 4. Update the status of the most efficient test to IN_QUEUE
    const assignedTest = await PatientRepository.updatePatientTestStatus(
      mostEfficientTest.id,
      "IN_QUEUE"
    );

    logger.info(
      `Patient ${patientId} checked in and was assigned to test ${assignedTest.id} in room ${assignedTest.test.roomNumber}.`
    );

    // 5. Return the newly assigned test booking
    return assignedTest;
  },
};
