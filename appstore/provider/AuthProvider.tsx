"use client";

import { useCheckMeQuery } from "@/appstore/api/authApi";
import { useAppDispatch } from "@/appstore/hooks/hooks";
import { setSession, clearSession } from "@/appstore/slices/sessionSlice";
import { useEffect } from "react";

export default function AuthProvider({ children }: any) {
  const { data, isLoading, isError } = useCheckMeQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.user) {
      dispatch(
        setSession({
          user: data.user,
        }),
      );
    } else if (isError) {
      dispatch(clearSession());
    }
  }, [data, isError, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
}
