import { createSlice } from '@reduxjs/toolkit';

const moodSlice = createSlice({
  name: 'mood',
  initialState: [],
  reducers: {
    addEntry: (state, action) => {
      state.push({ id: Date.now().toString(), mood: action.payload, date: new Date().toISOString() });
    },
  },
});

export const { addEntry } = moodSlice.actions;
export default moodSlice.reducer;
