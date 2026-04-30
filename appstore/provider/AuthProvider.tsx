"use client";

import { useCheckMeQuery } from "@/appstore/api/authApi";
import { useAppDispatch, useAppSelector } from "@/appstore/hooks/hooks";
import {
  setSession,
  clearSession,
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

  const { data, isError, isSuccess } = useCheckMeQuery(undefined, {
    skip: isLoggedOut,
  });

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setSession({ user: data.user }));
    } else if (isError) {
      dispatch(clearSession());
    }
  }, [isSuccess, isError, data, dispatch]);

  return <>{children}</>;
}
