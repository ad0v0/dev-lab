import { create } from 'zustand'

export const useColors = create((set) =>  ({
  colors: [],
  isLoading: false,
  error: null,

  fetchColors: async () => {
    try {
      set({
        isLoading: true,
        error: null
      })

      const response = await fetch(`${import.meta.env.VITE_COLORS_API}/scheme?hex=0047AB&mode=analogic&count=6`);
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
