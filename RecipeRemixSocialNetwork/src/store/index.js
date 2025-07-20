import { configureStore, createSlice } from '@reduxjs/toolkit';

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: [],
  reducers: {
    addRecipe: (state, action) => {
      state.push({ id: Date.now().toString(), title: action.payload });
    },
  },
});

export const { addRecipe } = recipesSlice.actions;

export const store = configureStore({
  reducer: {
    recipes: recipesSlice.reducer,
  },
});
