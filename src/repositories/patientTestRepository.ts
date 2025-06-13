import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import dbClient, { patientTestsTable } from "../config/dynamodb";
import PatientTest from "../models/patientTest";

export const patientTestRepository = {
  findByPatientId: async (patientId: string): Promise<PatientTest[]> => {
    const params = {
      TableName: patientTestsTable,
      IndexName: "patientId-index",
      KeyConditionExpression: "patientId = :patientId",
      ExpressionAttributeValues: {
        ":patientId": patientId,
      },
    };

    const { Items } = await dbClient.send(new QueryCommand(params));
    return (Items || []) as PatientTest[];
  },
};
