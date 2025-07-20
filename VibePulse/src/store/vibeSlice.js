import { createSlice } from '@reduxjs/toolkit';

const vibeSlice = createSlice({
  name: 'vibe',
  initialState: [],
  reducers: {
    addVibe: (state, action) => {
      state.push({ id: Date.now().toString(), emotion: action.payload.emotion, notes: action.payload.notes });
    },
  },
});

export const { addVibe } = vibeSlice.actions;
export default vibeSlice.reducer;
