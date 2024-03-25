"use server";
import prisma from "@/lib/prisma";

export const getProductNextSku = async (categoryId: number) => {
  return await prisma.product.count({
    where: {
      categoryId,
    },
  });
};
