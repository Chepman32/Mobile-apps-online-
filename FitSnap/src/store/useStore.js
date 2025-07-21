import create from 'zustand';

const useStore = create(set => ({
  xp: 0,
  increaseXP: amt => set(state => ({ xp: state.xp + amt })),
  reset: () => set({ xp: 0 })
}));

export default useStore;
