import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthState = {
  user: AuthUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};

const initialState: AuthState = {
  user: null,
  status: 'idle',
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    params: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      await new Promise((r) => setTimeout(r, 600));
      if (!params.email || !params.password) {
        throw new Error('Missing credentials');
      }
      return {
        id: 'u_1',
        name: 'Admin User',
        email: params.email,
      } as AuthUser;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await new Promise((r) => setTimeout(r, 200));
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) ?? 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;


