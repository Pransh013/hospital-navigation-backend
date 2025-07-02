import { GetCommand } from "@aws-sdk/lib-dynamodb";
import dbClient, { bookingSlotsTable } from "../config/dynamodb.js";
import { BookingSlot } from "../models/bookingSlot.js";

export const bookingSlotRepository = {
  findById: async (slotId: string): Promise<BookingSlot> => {
    const params = {
      TableName: bookingSlotsTable,
      Key: { slotId },
    };

    const { Item } = await dbClient.send(new GetCommand(params));
    if (!Item) {
      const error: any = new Error("Booking slot not found");
      error.statusCode = 404;
      throw error;
    }
    return Item as BookingSlot;
  },
};
