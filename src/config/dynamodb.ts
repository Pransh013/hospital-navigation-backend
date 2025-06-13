import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { env } from "./env";

const awsConfig = {
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
};

const dynamoDBClient = new DynamoDBClient(awsConfig);
const dbClient = DynamoDBDocumentClient.from(dynamoDBClient);

export const patientsTable = env.DYNAMODB_TABLE_PATIENTS || "patients table";

export default dbClient;
