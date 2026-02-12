import { create } from 'zustand'

export const useColors = create((set) =>  ({
  colors: [],
  isLoading: false,
  error: null,

  fetchColors: async (baseColor, count, mode) => {
    try {
      set({
        isLoading: true,
        error: null
      })

      const response = await fetch(`${import.meta.env.VITE_COLORS_API}/scheme?hex=${baseColor.replace('#', '')}&mode=${mode.toLowerCase()}&count=${count}`);

      if (!response.ok) {
        throw new Error("Failed to fetch the colors")
      }

      const data = await response.json();

      set({
        colors: data.colors
      });
    } catch (error) {
      set({
        error: error.message
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  }
}));
