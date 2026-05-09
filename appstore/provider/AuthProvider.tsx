"use client";

import { useCheckMeQuery } from "@/appstore/api/authApi";
import { useAppDispatch, useAppSelector } from "@/appstore/hooks/hooks";
import {
  setSession,
  clearSession,
  setLoading,
  selectIsLoggedOut,
} from "@/appstore/slices/sessionSlice";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const isLoggedOut = useAppSelector(selectIsLoggedOut);

  const { data, isError, isSuccess, isLoading } = useCheckMeQuery(undefined, {
    skip: isLoggedOut,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  // Set loading state
  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading());
    }
  }, [isLoading, dispatch]);

  // Set session when checkMe succeeds
  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setSession({ user: data.user }));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(clearSession());
    }
  }, [isError, dispatch]);

  return <>{children}</>;
}
