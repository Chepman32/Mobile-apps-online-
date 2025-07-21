import create from 'zustand';

interface AppState {
  session: string | null;
  setSession: (session: string | null) => void;
}

export const useAppStore = create<AppState>(set => ({
  session: null,
  setSession: session => set({ session })
}));
