"use client";

import { useCheckMeQuery } from "@/appstore/api/authApi";
import { useAppDispatch } from "@/appstore/hooks/hooks";
import { setSession, clearSession } from "@/appstore/slices/sessionSlice";
import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isError } = useCheckMeQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.user) {
      dispatch(setSession({ user: data.user }));
    } else if (isError) {
      dispatch(clearSession());
    }
  }, [data, isError, dispatch]);

  return children;
}
