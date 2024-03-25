import { User } from "@/interfaces/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  user: User;
  setUser: (user: User) => void;
  deleteUser: () => void;
}

export const useUserStore = create(
  persist<State>(
    (set) => {
      return {
        user: {} as User,
        setUser: (user: User) => set({ user }),
        deleteUser: () => set({ user: {} as User }),
      };
    },
    { name: "user-store" }
  )
);
