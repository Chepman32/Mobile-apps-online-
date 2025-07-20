import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const signInUser = createAsyncThunk(
  'user/signIn',
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    return userDoc.exists() ? userDoc.data() : null;
  }
);

export const signUpUser = createAsyncThunk(
  'user/signUp',
  async ({ email, password, name }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    
    const userData = {
      id: userCredential.user.uid,
      name,
      email,
      avatar: null,
      badges: [],
      totalWorkouts: 0,
      totalCalories: 0,
      totalDistance: 0,
      totalTime: 0,
      currentStreak: 0,
      bestStreak: 0,
      level: 1,
      experience: 0,
      createdAt: new Date().toISOString(),
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    return userData;
  }
);

export const signOutUser = createAsyncThunk(
  'user/signOut',
  async () => {
    await signOut(auth);
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, updates }) => {
    await updateDoc(doc(db, 'users', userId), updates);
    return updates;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    updateUserStats: (state, action) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    addBadge: (state, action) => {
      if (state.currentUser && !state.currentUser.badges.includes(action.payload)) {
        state.currentUser.badges.push(action.payload);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthenticated = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser = { ...state.currentUser, ...action.payload };
        }
      });
  },
});

export const { setUser, updateUserStats, addBadge, clearError } = userSlice.actions;
export default userSlice.reducer;
