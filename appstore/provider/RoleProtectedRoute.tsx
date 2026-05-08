"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/hooks";
import { useRouter } from "next/navigation";
import ForbiddenPage from "@/components/home/common/Forbidden";

const RoleProtectedRoute = ({
  children,
  allowRoles,
}: {
  children: React.ReactNode;
  allowRoles: string[];
}) => {
  const { user, status, isLoggedOut } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    } else if (status === "authenticated" || status === "unauthenticated") {
      setIsLoading(false);
    }

    if (!user?.role || isLoggedOut) {
      router.replace("/login");
    }
  }, [user, isLoggedOut, status, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user?.role) {
    return null;
  }

  if (!allowRoles.includes(user?.role)) {
    return (
      <>
        <ForbiddenPage />
      </>
    );
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
