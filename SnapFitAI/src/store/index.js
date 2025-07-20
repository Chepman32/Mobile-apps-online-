import create from 'zustand';

const useStore = create(set => ({
  darkMode: false,
  toggleTheme: () => set(state => ({ darkMode: !state.darkMode })),
  user: null,
  setUser: user => set({ user })
}));

export default useStore;
