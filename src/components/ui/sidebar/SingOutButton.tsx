"use client";

import { useLoadingStore } from "@/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const SingOutButton = ({ onClick }: { onClick: () => void }) => {
  const supabase = createClientComponentClient();
  const tooggleLoading = useLoadingStore((state) => state.toggleLoading);

  const handleSignOut = async () => {
    tooggleLoading(true);
    await supabase.auth.signOut();
    tooggleLoading(false);
    onClick();
  };

  return (
    <button onClick={handleSignOut} className="text-white mt-0 flex gap-2">
      <label className="cursor-pointer border-[1px] border-gray-200 p-1  rounded hover:bg-main/10">
        Cerrar Sesión
      </label>
    </button>
  );
};
