"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

interface StoreState {
  lock: boolean;
  setLock: (value: boolean) => void;
}

const cookieStorage = {
  getItem: (name: any) => {
    const item = Cookies.get(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: any, value: any) => {
    Cookies.set(name, JSON.stringify(value), { expires: 7 });
  },
  removeItem: (name: any) => {
    Cookies.remove(name);
  },
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      lock: true,
      setLock: (value: boolean) => set({ lock: value }),
    }),
    {
      name: "zustand-state",
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
