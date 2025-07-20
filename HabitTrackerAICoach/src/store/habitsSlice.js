import { createSlice } from '@reduxjs/toolkit';

const habitsSlice = createSlice({
  name: 'habits',
  initialState: [],
  reducers: {
    addHabit: (state, action) => {
      state.push({ id: Date.now().toString(), title: action.payload, streak: 0 });
    },
    toggleHabit: (state, action) => {
      const habit = state.find(h => h.id === action.payload);
      if (habit) {
        habit.streak += 1;
      }
    },
  },
});

export const { addHabit, toggleHabit } = habitsSlice.actions;
export default habitsSlice.reducer;
