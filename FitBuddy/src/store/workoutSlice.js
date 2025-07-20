import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveWorkout = createAsyncThunk(
  'workout/save',
  async (workoutData) => {
    // Simulate API call
    const response = await new Promise(resolve => 
      setTimeout(() => resolve({
        id: Date.now(),
        ...workoutData,
        savedAt: new Date().toISOString()
      }), 1000)
    );
    return response;
  }
);

export const fetchWorkoutHistory = createAsyncThunk(
  'workout/fetchHistory',
  async (userId) => {
    // Simulate API call
    const response = await new Promise(resolve => 
      setTimeout(() => resolve([
        {
          id: 1,
          type: 'running',
          duration: 45,
          calories: 320,
          distance: 5.2,
          date: '2024-01-21T08:30:00Z',
          route: [
            { lat: 37.7749, lng: -122.4194 },
            { lat: 37.7750, lng: -122.4195 }
          ]
        },
        {
          id: 2,
          type: 'cycling',
          duration: 60,
          calories: 450,
          distance: 15.8,
          date: '2024-01-20T16:00:00Z',
          route: [
            { lat: 37.7749, lng: -122.4194 },
            { lat: 37.7750, lng: -122.4195 }
          ]
        },
        {
          id: 3,
          type: 'strength',
          duration: 30,
          calories: 180,
          distance: 0,
          date: '2024-01-19T19:00:00Z',
          exercises: [
            { name: 'Push-ups', sets: 3, reps: 15 },
            { name: 'Squats', sets: 3, reps: 20 },
            { name: 'Planks', sets: 3, duration: 60 }
          ]
        }
      ]), 1000)
    );
    return response;
  }
);

const initialState = {
  currentWorkout: null,
  workoutHistory: [],
  isTracking: false,
  metrics: {
    calories: 0,
    distance: 0,
    duration: 0,
    heartRate: 0,
    pace: 0
  },
  isLoading: false,
  error: null,
  workoutTypes: [
    { id: 'running', name: 'Running', icon: '🏃', color: '#FF6B6B' },
    { id: 'cycling', name: 'Cycling', icon: '🚴', color: '#4ECDC4' },
    { id: 'walking', name: 'Walking', icon: '🚶', color: '#45B7D1' },
    { id: 'strength', name: 'Strength', icon: '💪', color: '#96CEB4' },
    { id: 'yoga', name: 'Yoga', icon: '🧘', color: '#FFEAA7' },
    { id: 'swimming', name: 'Swimming', icon: '🏊', color: '#DDA0DD' }
  ]
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    startWorkout: (state, action) => {
      state.currentWorkout = {
        id: Date.now(),
        type: action.payload.type,
        startTime: new Date().toISOString(),
        duration: 0,
        calories: 0,
        distance: 0,
        heartRate: 0,
        pace: 0,
        isActive: true,
        route: []
      };
      state.isTracking = true;
    },
    updateMetrics: (state, action) => {
      if (state.currentWorkout) {
        state.currentWorkout = { ...state.currentWorkout, ...action.payload };
        state.metrics = { ...state.metrics, ...action.payload };
      }
    },
    addRoutePoint: (state, action) => {
      if (state.currentWorkout && state.currentWorkout.route) {
        state.currentWorkout.route.push(action.payload);
      }
    },
    pauseWorkout: (state) => {
      if (state.currentWorkout) {
        state.currentWorkout.isActive = false;
        state.isTracking = false;
      }
    },
    resumeWorkout: (state) => {
      if (state.currentWorkout) {
        state.currentWorkout.isActive = true;
        state.isTracking = true;
      }
    },
    endWorkout: (state, action) => {
      if (state.currentWorkout) {
        state.currentWorkout = { 
          ...state.currentWorkout, 
          ...action.payload,
          endTime: new Date().toISOString(),
          isActive: false 
        };
        state.isTracking = false;
      }
    },
    resetWorkout: (state) => {
      state.currentWorkout = null;
      state.isTracking = false;
      state.metrics = {
        calories: 0,
        distance: 0,
        duration: 0,
        heartRate: 0,
        pace: 0
      };
    },
    setWorkoutType: (state, action) => {
      state.selectedWorkoutType = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveWorkout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workoutHistory.unshift(action.payload);
        state.currentWorkout = null;
      })
      .addCase(saveWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWorkoutHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWorkoutHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workoutHistory = action.payload;
      })
      .addCase(fetchWorkoutHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { 
  startWorkout, 
  updateMetrics, 
  addRoutePoint, 
  pauseWorkout, 
  resumeWorkout, 
  endWorkout, 
  resetWorkout,
  setWorkoutType
} = workoutSlice.actions;

export default workoutSlice.reducer;