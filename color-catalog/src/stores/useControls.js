import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const initialState = {
  baseColor: '#9486B9',
  mode: 'analogic',
  count: 4,
  search: '',
  sort: 'none',
};

export const useControls = create(
  persist((set) => ({
      ...initialState,

      setBaseColor: (newBaseColor) => set({ baseColor: newBaseColor }),
      setMode: (newMode) => set({ mode: newMode }),
      setCount: (newCount) => set({ count: newCount }),
      setSearch: (newSearch) => set({ search: newSearch }),
      setSort: (newSort) => set({ sort: newSort }),
      resetControls: () => set({ ...initialState })
    }),
    {
      name: 'colors-controls-storage'
    }
  )
);
