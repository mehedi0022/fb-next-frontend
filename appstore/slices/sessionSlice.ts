import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: number;
  email?: string;
  name?: string;
  role?: string;
}

export interface SessionState {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  isLoggedOut: boolean;
}

const initialState: SessionState = {
  user: null,
  status: "loading",
  isLoggedOut: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.status = "authenticated";
      state.isLoggedOut = false;
    },
    clearSession: (state) => {
      state.user = null;
      state.status = "unauthenticated";
      state.isLoggedOut = true;
    },
    setLoading: (state) => {
      state.status = "loading";
    },
  },
});

export const { setSession, clearSession, setLoading } = sessionSlice.actions;
export default sessionSlice.reducer;

export const selectUser = (state: { session: SessionState }) => state.session.user;
export const selectSessionStatus = (state: { session: SessionState }) => state.session.status;
export const selectUserRole = (state: { session: SessionState }) => state.session.user?.role ?? null;
export const selectIsAuthenticated = (state: { session: SessionState }) => state.session.status === "authenticated";

export const selectIsLoggedOut = (state: { session: SessionState }) => state.session.isLoggedOut;