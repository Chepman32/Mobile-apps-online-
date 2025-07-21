import create from 'zustand';

export const useAppStore = create(set => ({
  session: null,
  setSession: session => set({ session }),
}));
