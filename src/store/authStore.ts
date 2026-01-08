// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ModulesResType } from "../types/modulesTypes";

interface MenuAccessType extends ModulesResType {
  actions: string[];
}

type User = {
  id: string | null;
  email: string | null;
  name: string | null;
  role: string | null;
};

type AuthState = {
  user: User;
  menuAccess: MenuAccessType[];
  setUser: (user: User, permissions: MenuAccessType[]) => void;
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
      menuAccess: [],

      setUser: (user, permissions) =>
        set({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          menuAccess: permissions,
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
export const setAuthDetailsAction = (
  data: User,
  permissions: MenuAccessType[]
) => {
  console.log("AUTH DATA:", data);
  useAuthStore.getState().setUser(data, permissions);
};
