import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: number;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

export interface SessionState {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  userAccess?: any;
}

const initialState: SessionState = {
  user: null,
  status: "loading",
  userAccess: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (
      state,
      action: PayloadAction<{
        user: User;
        userAccess?: any;
      }>,
    ) => {
      state.user = action.payload.user;
      state.status = "authenticated";

      if (action.payload.userAccess !== undefined) {
        state.userAccess = action.payload.userAccess;
      }
    },

    clearSession: (state) => {
      state.user = null;
      state.status = "unauthenticated";
      state.userAccess = null;
    },

    setLoading: (state) => {
      state.status = "loading";
    },
  },
});

export const { setSession, clearSession, setLoading } = sessionSlice.actions;
export default sessionSlice.reducer;

export const selectUser = (state: { session: SessionState }) =>
  state.session.user;

export const selectSessionStatus = (state: { session: SessionState }) =>
  state.session.status;

export const selectUserAccess = (state: { session: SessionState }) =>
  state.session.userAccess;
