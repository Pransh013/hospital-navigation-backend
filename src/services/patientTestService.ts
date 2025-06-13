import { patientTestRepository } from "../repositories/patientTestRepository";
import { testRepository } from "../repositories/testRepository";
import PatientTest from "../models/patientTest";
import Test from "../models/test";

interface PatientTestWithDetails extends PatientTest {
  testDetails: Test;
}

export const patientTestService = {
  getPatientTests: async (
    patientId: string
  ): Promise<PatientTestWithDetails[]> => {
    const patientTests = await patientTestRepository.findByPatientId(patientId);

    const testIds = [...new Set(patientTests.map((test) => test.testId))];

    const tests = await testRepository.findByIds(testIds);

    const testDetailsMap = new Map(tests.map((test) => [test.testId, test]));

    return patientTests.map((patientTest) => ({
      ...patientTest,
      testDetails: testDetailsMap.get(patientTest.testId)!,
    }));
  },
};
