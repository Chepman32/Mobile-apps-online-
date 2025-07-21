import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(persist(
  (set) => ({
    onboarded: false,
    xp: 0,
    sessions: [],
    completeOnboarding: () => set({ onboarded: true }),
    addSession: (duration) => set((state) => ({
      sessions: [...state.sessions, { duration, date: Date.now() }],
      xp: state.xp + duration / 25
    })),
  }),
  { name: 'sparkfocus-storage' }
));

export default useStore;
