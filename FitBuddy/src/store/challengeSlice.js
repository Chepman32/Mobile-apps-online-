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
  orderBy,
  onSnapshot 
} from 'firebase/firestore';

export const createChallenge = createAsyncThunk(
  'challenges/create',
  async ({ title, description, goal, type, duration, participants }) => {
    const challengeData = {
      title,
      description,
      goal,
      type,
      duration,
      participants: participants || [],
      status: 'active',
      createdAt: new Date().toISOString(),
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString(),
      leaderboard: [],
      totalParticipants: participants ? participants.length : 0,
    };
    
    const docRef = await addDoc(collection(db, 'challenges'), challengeData);
    return { id: docRef.id, ...challengeData };
  }
);

export const joinChallenge = createAsyncThunk(
  'challenges/join',
  async ({ challengeId, userId, userName }) => {
    const challengeRef = doc(db, 'challenges', challengeId);
    const challengeDoc = await getDocs(query(collection(db, 'challenges'), where('__name__', '==', challengeId)));
    
    if (challengeDoc.empty) throw new Error('Challenge not found');
    
    const challenge = challengeDoc.docs[0].data();
    const updatedParticipants = [...(challenge.participants || []), { id: userId, name: userName, progress: 0 }];
    
    await updateDoc(challengeRef, {
      participants: updatedParticipants,
      totalParticipants: updatedParticipants.length,
    });
    
    return { challengeId, participant: { id: userId, name: userName, progress: 0 } };
  }
);

export const updateChallengeProgress = createAsyncThunk(
  'challenges/updateProgress',
  async ({ challengeId, userId, progress, workoutData }) => {
    const challengeRef = doc(db, 'challenges', challengeId);
    const challengeDoc = await getDocs(query(collection(db, 'challenges'), where('__name__', '==', challengeId)));
    
    if (challengeDoc.empty) throw new Error('Challenge not found');
    
    const challenge = challengeDoc.docs[0].data();
    const updatedParticipants = challenge.participants.map(participant => 
      participant.id === userId 
        ? { ...participant, progress, lastWorkout: workoutData }
        : participant
    );
    
    // Update leaderboard
    const sortedParticipants = updatedParticipants.sort((a, b) => b.progress - a.progress);
    
    await updateDoc(challengeRef, {
      participants: updatedParticipants,
      leaderboard: sortedParticipants,
    });
    
    return { challengeId, participants: updatedParticipants, leaderboard: sortedParticipants };
  }
);

export const fetchChallenges = createAsyncThunk(
  'challenges/fetch',
  async (userId) => {
    const challengesQuery = query(
      collection(db, 'challenges'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(challengesQuery);
    const challenges = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return challenges;
  }
);

const challengeSlice = createSlice({
  name: 'challenges',
  initialState: {
    challenges: [],
    currentChallenge: null,
    loading: false,
    error: null,
    leaderboard: [],
  },
  reducers: {
    setCurrentChallenge: (state, action) => {
      state.currentChallenge = action.payload;
    },
    updateLeaderboard: (state, action) => {
      state.leaderboard = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addWorkoutToChallenge: (state, action) => {
      const { challengeId, workoutData } = action.payload;
      const challenge = state.challenges.find(c => c.id === challengeId);
      if (challenge) {
        challenge.workouts = challenge.workouts || [];
        challenge.workouts.push(workoutData);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChallenge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChallenge.fulfilled, (state, action) => {
        state.loading = false;
        state.challenges.unshift(action.payload);
      })
      .addCase(createChallenge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(joinChallenge.fulfilled, (state, action) => {
        const challenge = state.challenges.find(c => c.id === action.payload.challengeId);
        if (challenge) {
          challenge.participants.push(action.payload.participant);
          challenge.totalParticipants = challenge.participants.length;
        }
      })
      .addCase(updateChallengeProgress.fulfilled, (state, action) => {
        const challenge = state.challenges.find(c => c.id === action.payload.challengeId);
        if (challenge) {
          challenge.participants = action.payload.participants;
          challenge.leaderboard = action.payload.leaderboard;
        }
      })
      .addCase(fetchChallenges.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.challenges = action.payload;
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  setCurrentChallenge, 
  updateLeaderboard, 
  clearError, 
  addWorkoutToChallenge 
} = challengeSlice.actions;
export default challengeSlice.reducer;
