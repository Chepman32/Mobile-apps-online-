import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';

export const startWorkout = createAsyncThunk(
  'workout/start',
  async ({ userId, workoutType, duration, goal }) => {
    const workoutData = {
      userId,
      type: workoutType,
      duration,
      goal,
      status: 'active',
      startTime: new Date().toISOString(),
      currentTime: 0,
      calories: 0,
      distance: 0,
      heartRate: [],
      steps: 0,
      pace: 0,
    };
    
    const docRef = await addDoc(collection(db, 'workouts'), workoutData);
    return { id: docRef.id, ...workoutData };
  }
);

export const updateWorkoutProgress = createAsyncThunk(
  'workout/updateProgress',
  async ({ workoutId, progressData }) => {
    const workoutRef = doc(db, 'workouts', workoutId);
    await updateDoc(workoutRef, {
      ...progressData,
      lastUpdated: new Date().toISOString(),
    });
    
    return { workoutId, ...progressData };
  }
);

export const endWorkout = createAsyncThunk(
  'workout/end',
  async ({ workoutId, finalStats }) => {
    const workoutRef = doc(db, 'workouts', workoutId);
    const endTime = new Date().toISOString();
    
    const workoutData = {
      status: 'completed',
      endTime,
      totalTime: finalStats.duration,
      totalCalories: finalStats.calories,
      totalDistance: finalStats.distance,
      averageHeartRate: finalStats.averageHeartRate,
      totalSteps: finalStats.steps,
      averagePace: finalStats.averagePace,
      achievements: finalStats.achievements || [],
    };
    
    await updateDoc(workoutRef, workoutData);
    return { workoutId, ...workoutData };
  }
);

export const fetchUserWorkouts = createAsyncThunk(
  'workout/fetchUserWorkouts',
  async (userId) => {
    const workoutsQuery = query(
      collection(db, 'workouts'),
      where('userId', '==', userId),
      orderBy('startTime', 'desc')
    );
    
    const snapshot = await getDocs(workoutsQuery);
    const workouts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return workouts;
  }
);

export const saveWorkoutPlan = createAsyncThunk(
  'workout/savePlan',
  async ({ userId, planData }) => {
    const plan = {
      userId,
      ...planData,
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    
    const docRef = await addDoc(collection(db, 'workoutPlans'), plan);
    return { id: docRef.id, ...plan };
  }
);

const workoutSlice = createSlice({
  name: 'workout',
  initialState: {
    currentWorkout: null,
    workoutHistory: [],
    workoutPlans: [],
    isTracking: false,
    loading: false,
    error: null,
    stats: {
      totalWorkouts: 0,
      totalCalories: 0,
      totalDistance: 0,
      totalTime: 0,
      averageHeartRate: 0,
      bestWorkout: null,
    },
  },
  reducers: {
    setCurrentWorkout: (state, action) => {
      state.currentWorkout = action.payload;
      state.isTracking = !!action.payload;
    },
    updateWorkoutStats: (state, action) => {
      if (state.currentWorkout) {
        state.currentWorkout = { ...state.currentWorkout, ...action.payload };
      }
    },
    addHeartRateReading: (state, action) => {
      if (state.currentWorkout) {
        state.currentWorkout.heartRate.push(action.payload);
      }
    },
    updatePace: (state, action) => {
      if (state.currentWorkout) {
        state.currentWorkout.pace = action.payload;
      }
    },
    addAchievement: (state, action) => {
      if (state.currentWorkout) {
        state.currentWorkout.achievements = state.currentWorkout.achievements || [];
        state.currentWorkout.achievements.push(action.payload);
      }
    },
    clearWorkoutError: (state) => {
      state.error = null;
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkout = action.payload;
        state.isTracking = true;
      })
      .addCase(startWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateWorkoutProgress.fulfilled, (state, action) => {
        if (state.currentWorkout && state.currentWorkout.id === action.payload.workoutId) {
          state.currentWorkout = { ...state.currentWorkout, ...action.payload };
        }
      })
      .addCase(endWorkout.fulfilled, (state, action) => {
        state.currentWorkout = null;
        state.isTracking = false;
        state.workoutHistory.unshift(action.payload);
      })
      .addCase(fetchUserWorkouts.fulfilled, (state, action) => {
        state.workoutHistory = action.payload;
        // Calculate stats
        const stats = action.payload.reduce((acc, workout) => {
          if (workout.status === 'completed') {
            acc.totalWorkouts++;
            acc.totalCalories += workout.totalCalories || 0;
            acc.totalDistance += workout.totalDistance || 0;
            acc.totalTime += workout.totalTime || 0;
            if (workout.averageHeartRate) {
              acc.averageHeartRate = (acc.averageHeartRate + workout.averageHeartRate) / 2;
            }
            if (!acc.bestWorkout || workout.totalCalories > acc.bestWorkout.totalCalories) {
              acc.bestWorkout = workout;
            }
          }
          return acc;
        }, {
          totalWorkouts: 0,
          totalCalories: 0,
          totalDistance: 0,
          totalTime: 0,
          averageHeartRate: 0,
          bestWorkout: null,
        });
        state.stats = stats;
      })
      .addCase(saveWorkoutPlan.fulfilled, (state, action) => {
        state.workoutPlans.push(action.payload);
      });
  },
});

export const { 
  setCurrentWorkout, 
  updateWorkoutStats, 
  addHeartRateReading, 
  updatePace, 
  addAchievement, 
  clearWorkoutError,
  updateStats 
} = workoutSlice.actions;
export default workoutSlice.reducer;