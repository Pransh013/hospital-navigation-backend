import { GetCommand } from "@aws-sdk/lib-dynamodb";
import dbClient, { doctorsTable } from "../config/dynamodb.js";
import { Doctor } from "../models/doctor.js";

export const doctorRepository = {
  findById: async (doctorId: string): Promise<Doctor> => {
    const params = {
      TableName: doctorsTable,
      Key: { doctorId },
    };

    const { Item } = await dbClient.send(new GetCommand(params));
    if (!Item) {
      const error: any = new Error("Doctor not found");
      error.statusCode = 404;
      throw error;
    }
    return Item as Doctor;
  },
};
