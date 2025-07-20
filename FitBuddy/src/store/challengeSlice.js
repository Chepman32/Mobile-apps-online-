import { createSlice } from '@reduxjs/toolkit';

const challengeSlice = createSlice({
  name: 'challenges',
  initialState: [],
  reducers: {
    addChallenge: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addChallenge } = challengeSlice.actions;
export default challengeSlice.reducer;
