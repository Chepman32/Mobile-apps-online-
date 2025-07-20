import { configureStore } from '@reduxjs/toolkit';
import vibeReducer from './vibeSlice';

export const store = configureStore({
  reducer: { vibe: vibeReducer },
});
