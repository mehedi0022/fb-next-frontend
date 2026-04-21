"use client";

import AuthProvider from "@/appstore/provider/AuthProvider";
import { store } from "@/appstore/store";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
      <ToastContainer />
    </Provider>
  );
}
