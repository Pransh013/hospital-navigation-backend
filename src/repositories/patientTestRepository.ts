import { QueryCommand, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import dbClient, { patientTestsTable } from "../config/dynamodb";
import { PatientTest } from "../models/patientTest";

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

  findById: async (patientTestId: string): Promise<PatientTest> => {
    const params = {
      TableName: patientTestsTable,
      Key: { patientTestId },
    };

    const { Item } = await dbClient.send(new GetCommand(params));
    if (!Item) {
      const error: any = new Error("Patient test not found");
      error.statusCode = 404;
      throw error;
    }
    return Item as PatientTest;
  },

  updateStatusById: async (patientTestId: string, status: string) => {
    const params = {
      TableName: patientTestsTable,
      Key: { patientTestId },
      UpdateExpression: "set #status = :status",
      ExpressionAttributeNames: { "#status": "status" },
      ExpressionAttributeValues: { ":status": status },
      ReturnValues: "ALL_NEW" as const,
    };
    const { Attributes } = await dbClient.send(new UpdateCommand(params));
    if (!Attributes) {
      const error: any = new Error("Patient test not found");
      error.statusCode = 404;
      throw error;
    }
    return Attributes as PatientTest;
  },
};
