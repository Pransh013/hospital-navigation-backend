import { bookingSlotRepository } from "../repositories/bookingSlotRepository";
import { doctorRepository } from "../repositories/doctorRepository";
import { patientTestRepository } from "../repositories/patientTestRepository";
import { testRepository } from "../repositories/testRepository";
import { patientRepository } from "../repositories/patientRepository";
import { TestType, ConsultationSummary } from "../types";

export const patientTestService = {
  getPatientTests: async (patientId: string): Promise<TestType[]> => {
    const patientTests = await patientTestRepository.findByPatientId(patientId);
    const testIds = [...new Set(patientTests.map((test) => test.testId))];
    const tests = await testRepository.findByIds(testIds);
    const testDetailsMap = new Map(tests.map((test) => [test.testId, test]));

    return patientTests.map((patientTest) => {
      const details = testDetailsMap.get(patientTest.testId);
      return {
        patientTestId: patientTest.patientTestId,
        testName: details?.name || "",
        testStatus: patientTest.status,
        floorNumber: Number(details?.floorNumber) || 0,
        roomNumber: details?.roomNumber || "",
        duration: details?.duration || 0,
        patientsInLine: Number(details?.patientsWaiting),
      };
    });
  },

  getConsultationSummaryForPatient: async (
    patientId: string
  ): Promise<ConsultationSummary> => {
    const patient = await patientRepository.findById(patientId);
    if (
      !patient.consultationRequired ||
      !patient.doctorId ||
      !patient.consultationSlotId
    ) {
      const error: any = new Error("Consultation not yet scheduled");
      error.statusCode = 400;
      throw error;
    }
    const [doctor, slot] = await Promise.all([
      doctorRepository.findById(patient.doctorId),
      bookingSlotRepository.findById(patient.consultationSlotId),
    ]);
    return {
      doctorName: doctor.name,
      doctorDesignation: doctor.designation,
      slotDate: slot.date,
      slotStartTime: slot.startTime,
      slotEndTime: slot.endTime,
    };
  },

  markTestCompleted: async (patientTestId: string) => {
    const updatedPatientTest = await patientTestRepository.updateStatusById(
      patientTestId,
      "test_completed"
    );
    await testRepository.decrementPatientsWaiting(updatedPatientTest.testId);
    return updatedPatientTest;
  },
};
