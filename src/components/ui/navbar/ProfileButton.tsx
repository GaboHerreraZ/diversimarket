"use client";
import { useProfileStore } from "@/store";

export const ProfileButton = () => {
  const toogleSideMenu = useProfileStore((state) => state.toogleSideMenu);

  return (
    <button onClick={toogleSideMenu} className="z-50 text-main">
      Iniciar Sesión
    </button>
  );
};
