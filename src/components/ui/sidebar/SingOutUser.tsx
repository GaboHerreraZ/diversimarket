"use client";

import { useRouter } from "next/navigation";
import { SingOutButton } from "./SingOutButton";
import { useProfileStore, useUserStore } from "@/store";

export const SingOutUser = () => {
  const toogleSideMenu = useProfileStore((state) => state.toogleSideMenu);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const router = useRouter();

  const handleSignOut = async () => {
    toogleSideMenu();
    deleteUser();
    router.replace("/");
    router.refresh();
  };

  return <SingOutButton onClick={handleSignOut} />;
};
