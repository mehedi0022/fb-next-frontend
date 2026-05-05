"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCheckMeQuery } from "@/appstore/api/authApi";
import { useAppDispatch, useAppSelector } from "@/appstore/hooks/hooks";
import {
  setSession,
  clearSession,
  selectUser,
  selectIsLoggedOut,
} from "@/appstore/slices/sessionSlice";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isLoggedOut = useAppSelector(selectIsLoggedOut);

  /* 
    check-me will verify cookie/token directly
    if invalid -> error
    if valid -> user
  */
  const { data, isLoading, isSuccess, isError } = useCheckMeQuery(undefined, {
    skip: isLoggedOut,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    /* Logged in */
    if (isSuccess && data?.user) {
      dispatch(setSession({ user: data.user }));
    }

    /* Not logged in */
    if (isError) {
      dispatch(clearSession());

      /* Prevent redirect loop */
      if (pathname !== "/login") {
        router.replace("/login");
      }
    }
  }, [isSuccess, isError, data, dispatch, router, pathname]);

  /* Loading state while checking auth */
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
          <p className="text-sm font-medium text-slate-600">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  /* If protected route + no user */
  if (!user && pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
}