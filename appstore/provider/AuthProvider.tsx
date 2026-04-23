"use client";

import { useCheckMeQuery } from "@/appstore/api/authApi";
import { useAppDispatch } from "@/appstore/hooks/hooks";
import { setSession, clearSession } from "@/appstore/slices/sessionSlice";
import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isError, isSuccess } = useCheckMeQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setSession({ user: data.user }));
      console.log('Effect')
    } else if (isError) {
      dispatch(clearSession());
      console.log('Error Effect')
    }
  }, [isSuccess, isError, data]);

  return children;
}