import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for API calls
export const fetchChallenges = createAsyncThunk(
  'challenges/fetchAll',
  async () => {
    // Simulate API call
    const response = await new Promise(resolve => 
      setTimeout(() => resolve([
        {
          id: 1,
          title: 'Weekend Warriors',
          description: 'Complete 3 workouts this weekend',
          type: 'weekly',
          goal: 3,
          current: 2,
          participants: [
            { id: 1, name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', progress: 2 },
            { id: 2, name: 'Sarah Chen', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', progress: 3 },
            { id: 3, name: 'Mike Rodriguez', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', progress: 1 }
          ],
          startDate: '2024-01-20',
          endDate: '2024-01-22',
          status: 'active',
          reward: { type: 'badge', name: 'Weekend Warrior', icon: '🔥' }
        },
        {
          id: 2,
          title: 'Calorie Crushers',
          description: 'Burn 500 calories in one workout',
          type: 'single',
          goal: 500,
          current: 0,
          participants: [
            { id: 1, name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', progress: 0 },
            { id: 4, name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/23.jpg', progress: 450 }
          ],
          startDate: '2024-01-21',
          endDate: '2024-01-21',
          status: 'active',
          reward: { type: 'xp', amount: 100 }
        },
        {
          id: 3,
          title: 'Distance Kings',
          description: 'Run 10km this week',
          type: 'weekly',
          goal: 10,
          current: 6.5,
          participants: [
            { id: 1, name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', progress: 6.5 },
            { id: 2, name: 'Sarah Chen', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', progress: 8.2 },
            { id: 3, name: 'Mike Rodriguez', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', progress: 10.1 }
          ],
          startDate: '2024-01-15',
          endDate: '2024-01-21',
          status: 'active',
          reward: { type: 'badge', name: 'Distance King', icon: '👑' }
        }
      ]), 1000)
    );
    return response;
  }
);

export const joinChallenge = createAsyncThunk(
  'challenges/join',
  async ({ challengeId, userId }) => {
    // Simulate API call
    return { challengeId, userId };
  }
);

export const updateChallengeProgress = createAsyncThunk(
  'challenges/updateProgress',
  async ({ challengeId, userId, progress }) => {
    // Simulate API call
    return { challengeId, userId, progress };
  }
);

const initialState = {
  challenges: [],
  userChallenges: [],
  leaderboard: [],
  isLoading: false,
  error: null,
  activeChallenge: null
};

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    setActiveChallenge: (state, action) => {
      state.activeChallenge = action.payload;
    },
    updateLocalProgress: (state, action) => {
      const { challengeId, userId, progress } = action.payload;
      const challenge = state.challenges.find(c => c.id === challengeId);
      if (challenge) {
        const participant = challenge.participants.find(p => p.id === userId);
        if (participant) {
          participant.progress = progress;
          challenge.current = Math.max(...challenge.participants.map(p => p.progress));
        }
      }
    },
    addChallenge: (state, action) => {
      state.challenges.unshift(action.payload);
    },
    removeChallenge: (state, action) => {
      state.challenges = state.challenges.filter(c => c.id !== action.payload);
    },
    updateLeaderboard: (state, action) => {
      state.leaderboard = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallenges.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challenges = action.payload;
        state.userChallenges = action.payload.filter(c => 
          c.participants.some(p => p.id === 1) // Assuming current user ID is 1
        );
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(joinChallenge.fulfilled, (state, action) => {
        const { challengeId, userId } = action.payload;
        const challenge = state.challenges.find(c => c.id === challengeId);
        if (challenge) {
          challenge.participants.push({
            id: userId,
            name: 'Alex Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            progress: 0
          });
        }
      })
      .addCase(updateChallengeProgress.fulfilled, (state, action) => {
        const { challengeId, userId, progress } = action.payload;
        const challenge = state.challenges.find(c => c.id === challengeId);
        if (challenge) {
          const participant = challenge.participants.find(p => p.id === userId);
          if (participant) {
            participant.progress = progress;
            challenge.current = Math.max(...challenge.participants.map(p => p.progress));
          }
        }
      });
  }
});

export const { 
  setActiveChallenge, 
  updateLocalProgress, 
  addChallenge, 
  removeChallenge,
  updateLeaderboard
} = challengeSlice.actions;

export default challengeSlice.reducer;
