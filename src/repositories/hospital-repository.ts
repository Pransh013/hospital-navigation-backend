import { prisma } from "@/lib/index.js";

export const HospitalRepository = {
  getAll: async () => {
    return prisma.hospital.findMany({
      where: { active: true },
      select: { id: true, name: true },
    });
  },
};
