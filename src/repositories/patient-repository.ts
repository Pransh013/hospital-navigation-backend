import { endOfDay, startOfDay } from "date-fns";

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
    const from = startOfDay(new Date(date));
    const to = endOfDay(new Date(date));

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
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    return prisma.patientTest.findMany({
      where: {
        patientId,
        status: "SCHEDULED",
        scheduledAt: {
          gte: todayStart,
          lte: todayEnd,
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
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    return prisma.patientTest.findFirst({
      where: {
        patientId,
        status: {
          in: ["IN_QUEUE", "IN_PROGRESS"],
        },
        scheduledAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });
  },

  getQueueSizeForRoom: async (roomNumber: string) => {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    return prisma.patientTest.count({
      where: {
        status: {
          in: ["IN_QUEUE", "IN_PROGRESS"],
        },
        scheduledAt: {
          gte: todayStart,
          lte: todayEnd,
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
