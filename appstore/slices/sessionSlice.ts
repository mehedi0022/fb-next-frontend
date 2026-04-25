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
}

// Load initial state from localStorage if available
const loadInitialState = (): SessionState => {
  if (typeof window !== "undefined") {
    try {
      const savedSession = localStorage.getItem("fb_session");
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        return {
          user: parsed.user,
          status: "authenticated",
        };
      }
    } catch (error) {
      console.log("Failed to load session from localStorage");
    }
  }
  
  return {
    user: null,
    status: "loading",
  };
};

const initialState: SessionState = loadInitialState();

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.status = "authenticated";
      
      // Save to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("fb_session", JSON.stringify({ user: action.payload.user }));
        } catch (error) {
          console.log("Failed to save session to localStorage");
        }
      }
    },
    clearSession: (state) => {
      state.user = null;
      state.status = "unauthenticated";
      
      // Clear from localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("fb_session");
        } catch (error) {
          console.log("Failed to clear session from localStorage");
        }
      }
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