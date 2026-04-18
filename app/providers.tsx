"use client";

import { store } from "@/appstore/store";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ToastContainer />
      {children}
    </Provider>
  );
}
