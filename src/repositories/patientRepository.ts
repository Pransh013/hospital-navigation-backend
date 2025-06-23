import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import dbClient, { patientsTable } from "../config/dynamodb";
import { Patient } from "../models/patient";

export const patientRepository = {
  findByEmail: async (email: string): Promise<Patient> => {
    const params = {
      TableName: patientsTable,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
      Limit: 1,
    };

    const { Items } = await dbClient.send(new QueryCommand(params));
    if (!Items || Items.length === 0) {
      const error: any = new Error("Patient not found");
      error.statusCode = 404;
      throw error;
    }
    return Items[0] as Patient;
  },
};
