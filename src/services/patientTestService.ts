import { patientTestRepository } from "../repositories/patientTestRepository";
import { testRepository } from "../repositories/testRepository";

export type TestType = {
  patientTestId: string;
  testName: string;
  testStatus: string;
  floorNumber: number;
  roomNumber: number;
  patientsInLine: number;
};

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
        roomNumber: Number(details?.roomNumber) || 0,
        patientsInLine: Number(details?.patientsWaiting),
      };
    });
  },

  markTestCompleted: async (patientTestId: string) => {
    return await patientTestRepository.updateStatusById(
      patientTestId,
      "test_completed"
    );
  },
};
