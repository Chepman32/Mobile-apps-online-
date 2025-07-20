import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import challengeReducer from './challengeSlice';
import workoutReducer from './workoutSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    challenges: challengeReducer,
    workout: workoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
