import { configureStore } from '@reduxjs/toolkit';
import habitsReducer from './habitsSlice';

export default configureStore({
  reducer: { habits: habitsReducer },
});
