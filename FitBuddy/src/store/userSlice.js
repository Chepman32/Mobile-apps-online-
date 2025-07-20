import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for API calls
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId) => {
    // Simulate API call
    const response = await new Promise(resolve => 
      setTimeout(() => resolve({
        id: userId,
        name: 'Alex Johnson',
        email: 'alex@fitbuddy.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        level: 15,
        xp: 1250,
        totalWorkouts: 47,
        totalCalories: 12500,
        totalDistance: 85.5,
        totalTime: 3240, // minutes
        badges: [
          { id: 1, name: 'First Steps', icon: '👟', unlocked: true },
          { id: 2, name: 'Week Warrior', icon: '🔥', unlocked: true },
          { id: 3, name: 'Marathon Ready', icon: '🏃', unlocked: false },
          { id: 4, name: 'Social Butterfly', icon: '🦋', unlocked: true },
          { id: 5, name: 'Challenge Master', icon: '🏆', unlocked: false }
        ],
        friends: [
          { id: 2, name: 'Sarah Chen', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', level: 12 },
          { id: 3, name: 'Mike Rodriguez', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', level: 18 },
          { id: 4, name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/23.jpg', level: 9 }
        ],
        currentStreak: 7,
        longestStreak: 21,
        weeklyGoal: 150,
        weeklyProgress: 120
      }), 1000)
    );
    return response;
  }
);

export const updateUserStats = createAsyncThunk(
  'user/updateStats',
  async (workoutData) => {
    // Simulate API call to update user stats
    return workoutData;
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  currentWorkout: null,
  notifications: [],
  achievements: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    startWorkout: (state, action) => {
      state.currentWorkout = {
        id: Date.now(),
        startTime: new Date().toISOString(),
        type: action.payload.type,
        duration: 0,
        calories: 0,
        distance: 0,
        isActive: true
      };
    },
    updateWorkout: (state, action) => {
      if (state.currentWorkout) {
        state.currentWorkout = { ...state.currentWorkout, ...action.payload };
      }
    },
    endWorkout: (state, action) => {
      if (state.currentWorkout) {
        state.currentWorkout = { ...state.currentWorkout, ...action.payload, isActive: false };
      }
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    clearNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    unlockBadge: (state, action) => {
      if (state.user && state.user.badges) {
        const badge = state.user.badges.find(b => b.id === action.payload);
        if (badge) {
          badge.unlocked = true;
        }
      }
    },
    updateWeeklyProgress: (state, action) => {
      if (state.user) {
        state.user.weeklyProgress = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserStats.fulfilled, (state, action) => {
        if (state.user) {
          state.user.totalWorkouts += 1;
          state.user.totalCalories += action.payload.calories || 0;
          state.user.totalDistance += action.payload.distance || 0;
          state.user.totalTime += action.payload.duration || 0;
          state.user.xp += action.payload.xp || 0;
          
          // Level up logic
          const newLevel = Math.floor(state.user.xp / 100) + 1;
          if (newLevel > state.user.level) {
            state.user.level = newLevel;
            state.achievements.push({
              id: Date.now(),
              type: 'level_up',
              title: `Level ${newLevel}!`,
              description: `Congratulations! You've reached level ${newLevel}`,
              timestamp: new Date().toISOString()
            });
          }
        }
      });
  }
});

export const { 
  setUser, 
  startWorkout, 
  updateWorkout, 
  endWorkout, 
  addNotification, 
  clearNotification,
  unlockBadge,
  updateWeeklyProgress
} = userSlice.actions;

export default userSlice.reducer;
