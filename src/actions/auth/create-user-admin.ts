"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export const createUserAdmin = async (email: string, password: string) => {
  const supabase = createClient();

  const prismaTx = await prisma.$transaction(async (client) => {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      role: "admin",
      email_confirm: true,
      phone_confirm: true,
    });

    if (!error) {
      const user = await client.user.create({
        data: {
          email,
          role: "admin",
          authId: data.user?.id!,
          birthDay: 1,
          birthMonth: 1,
          lastName: "Apellidos Mayorista",
          completeProfile: false,
          name: "Nombre Mayorista",
          phone: "0000000000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return { user, error: null };
    }

    return { user: null, error: error.message };
  });

  revalidatePath("/admin/mayoristas", "page");

  return { user: prismaTx.user, error: prismaTx.error };
};
