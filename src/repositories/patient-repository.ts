import { endOfDay, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

import { prisma } from "../lib/index.js";

export const PatientRepository = {
  findByEmail: async (email: string, hospitalId: string) => {
    return prisma.patient.findFirst({
      where: { email, hospitalId },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  },

  findPatientById: async (id: string) => {
    return prisma.patient.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  },

  getBookings: async (patientId: string, date: string) => {
    const istDate = toZonedTime(new Date(date), "Asia/Kolkata");
    const from = fromZonedTime(startOfDay(istDate), "Asia/Kolkata");
    const to = fromZonedTime(endOfDay(istDate), "Asia/Kolkata");

    return prisma.patientTest.findMany({
      where: {
        patientId,
        scheduledAt: {
          gte: from,
          lte: to,
        },
      },
      select: {
        id: true,
        status: true,
        scheduledAt: true,
        checkInAt: true,
        test: {
          select: {
            id: true,
            name: true,
            roomNumber: true,
            floor: true,
            category: true,
            durationInMins: true,
          },
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });
  },

  getScheduledTestsByPatientId: async (patientId: string) => {
    const istDate = toZonedTime(new Date(), "Asia/Kolkata");
    const from = fromZonedTime(startOfDay(istDate), "Asia/Kolkata");
    const to = fromZonedTime(endOfDay(istDate), "Asia/Kolkata");

    return prisma.patientTest.findMany({
      where: {
        patientId,
        status: "SCHEDULED",
        scheduledAt: {
          gte: from,
          lte: to,
        },
      },
      include: {
        test: {
          select: {
            id: true,
            durationInMins: true,
            roomNumber: true,
          },
        },
      },
    });
  },

  getPatientActiveTests: async (patientId: string) => {
    const istDate = toZonedTime(new Date(), "Asia/Kolkata");
    const from = fromZonedTime(startOfDay(istDate), "Asia/Kolkata");
    const to = fromZonedTime(endOfDay(istDate), "Asia/Kolkata");

    return prisma.patientTest.findFirst({
      where: {
        patientId,
        status: {
          in: ["IN_QUEUE", "IN_PROGRESS"],
        },
        scheduledAt: {
          gte: from,
          lte: to,
        },
      },
    });
  },

  getQueueSizeForRoom: async (roomNumber: string) => {
    const istDate = toZonedTime(new Date(), "Asia/Kolkata");
    const from = fromZonedTime(startOfDay(istDate), "Asia/Kolkata");
    const to = fromZonedTime(endOfDay(istDate), "Asia/Kolkata");

    return prisma.patientTest.count({
      where: {
        status: {
          in: ["IN_QUEUE", "IN_PROGRESS"],
        },
        scheduledAt: {
          gte: from,
          lte: to,
        },
        test: {
          roomNumber,
        },
      },
    });
  },

  updatePatientTestStatus: async (
    patientTestId: string,
    status: "IN_QUEUE"
  ) => {
    return prisma.patientTest.update({
      where: {
        id: patientTestId,
      },
      data: {
        status: status,
        checkInAt: new Date(),
      },
      include: {
        test: true,
      },
    });
  },
};
