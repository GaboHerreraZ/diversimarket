"use server";

import { User } from "@/interfaces/user";
import prisma from "@/lib/prisma";

export const getUserByAuthId = async (authId: string) => {
  return (await prisma.user.findFirst({
    where: {
      authId,
    },
    include: {
      preference: true,
    },
  })) as User;
};
