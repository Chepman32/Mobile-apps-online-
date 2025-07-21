import create from 'zustand';

export const useAppStore = create(set => ({
  scenario: null,
  setScenario: scenario => set({ scenario }),
  analysis: null,
  setAnalysis: analysis => set({ analysis }),
}));
