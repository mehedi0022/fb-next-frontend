import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import sessionReducer from "./slices/sessionSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
