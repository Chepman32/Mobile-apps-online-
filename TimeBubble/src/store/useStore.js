import create from 'zustand';

export const useStore = create(set => ({
  bubbles: [],
  stats: {
    sessions: 0,
  },
  addBubble: bubble => set(state => ({ bubbles: [...state.bubbles, bubble] })),
  incrementSessions: () => set(state => ({ stats: { sessions: state.stats.sessions + 1 } })),
}));
