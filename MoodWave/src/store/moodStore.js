import create from 'zustand';

export const useMoodStore = create(set => ({
  moods: [],
  addMood: (entry) => set(state => ({ moods: [entry, ...state.moods] })),
}));
