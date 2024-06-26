"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (id: number) => {
  await prisma.category.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/categorias");
  revalidatePath("/admin");

  return true;
};
