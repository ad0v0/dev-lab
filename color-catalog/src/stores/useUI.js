import { create } from "zustand";

export const useUI = create((set) => ({
  theme: 'light',

  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
}));
