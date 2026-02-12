import { create } from 'zustand'

const initialState = {
  baseColor: '#9486B9',
  mode: 'analogic',
  count: 4,
  search: '',
  sort: 'none',
};

export const useControls = create((set, get) => ({
  ...initialState,

  setBaseColor: (newBaseColor) => set({ baseColor: newBaseColor }),
  setMode: (newMode) => set({ mode: newMode }),
  setCount: (newCount) => set({ count: newCount }),
  setSearch: (newSearch) => set({ search: newSearch }),
  setSort: (newSort) => set({ sort: newSort }),
  resetControls: () => set({ ...initialState })
}));
