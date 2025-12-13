// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string | null;
  email: string | null;
  name: string | null;
  role: string | null;
};

type AuthState = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: null,
        email: null,
        name: null,
        role: null,
      },

      setUser: (user) =>
        set({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        }),

      clearUser: () =>
        set({
          user: {
            id: null,
            email: null,
            name: null,
            role: null,
          },
        }),
    }),
    {
      name: "auth-store", // key in localStorage
    }
  )
);

// Action function
export const setAuthDetailsAction = (data: User) => {
  console.log("AUTH DATA:", data);
  useAuthStore.getState().setUser(data);
};
