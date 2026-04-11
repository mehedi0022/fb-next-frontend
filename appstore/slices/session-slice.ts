import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Session {
  accessToken?: string;
  refreshToken?: string;
  expires?: string;
  user?: unknown;
  [key: string]: unknown;
}

export interface SessionState {
  data: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  userAccess?: any;
}

const initialState: SessionState = {
  data: null,
  status: "loading",
  userAccess: null,
};

export interface SetSessionPayload {
  data: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  userAccess?: any;
}

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SetSessionPayload>) => {
      state.data = action.payload.data;
      state.status = action.payload.status;
      if (action.payload.userAccess !== undefined) {
        state.userAccess = action.payload.userAccess;
      }
    },
    clearSession: (state) => {
      state.data = null;
      state.status = "unauthenticated";
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;

// Selectors
export const selectSession = (state: { session: SessionState }) =>
  state.session.data;
export const selectSessionStatus = (state: { session: SessionState }) =>
  state.session.status;
export const selectAccessToken = (state: { session: SessionState }) =>
  state.session.data?.accessToken as string | undefined;
export const selectRefreshToken = (state: { session: SessionState }) =>
  state.session.data?.refreshToken as string | undefined;

export const selectUserAccess = (state: { session: SessionState }) =>
  state.session.userAccess;
