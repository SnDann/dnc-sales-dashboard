import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/types';

interface UserState {
  profile: UserProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    clearUserProfile(state) {
      state.profile = null;
      state.status = 'idle';
      state.error = null;
    },
    userLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    userFailed(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setUserProfile, clearUserProfile, userLoading, userFailed } = userSlice.actions;
export default userSlice.reducer;