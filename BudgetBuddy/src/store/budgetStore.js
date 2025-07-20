import create from 'zustand';

export const useBudgetStore = create(set => ({
  budgets: [],
  addBudget: (title, amount) =>
    set(state => ({
      budgets: [...state.budgets, { id: Date.now().toString(), title, amount }],
    })),
}));
