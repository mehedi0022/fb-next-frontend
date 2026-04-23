"use client";

import AuthProvider from "@/appstore/provider/AuthProvider";
import { store } from "@/appstore/store";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "@/components/home/common/ErrorBoundary";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          {children}
          <ToastContainer />
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}
