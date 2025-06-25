import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import dbClient, { testsTable } from "../config/dynamodb";
import { Test } from "../models/test";

export const testRepository = {
  findById: async (testId: string): Promise<Test> => {
    const params = {
      TableName: testsTable,
      Key: { testId },
    };

    const { Item } = await dbClient.send(new GetCommand(params));
    if (!Item) {
      const error: any = new Error("Test not found");
      error.statusCode = 404;
      throw error;
    }
    return Item as Test;
  },

  findByIds: async (testIds: string[]): Promise<Test[]> => {
    const tests = await Promise.all(
      testIds.map((testId) => testRepository.findById(testId))
    );
    return tests;
  },

  decrementPatientsWaiting: async (testId: string): Promise<void> => {
    await dbClient.send(
      new UpdateCommand({
        TableName: testsTable,
        Key: { testId },
        UpdateExpression:
          "SET patientsWaiting = if_not_exists(patientsWaiting, :zero) - :dec",
        ConditionExpression: "patientsWaiting > :zero",
        ExpressionAttributeValues: {
          ":dec": 1,
          ":zero": 0,
        },
      })
    );
  },
};
