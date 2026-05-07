"use client";

import React, { useEffect } from "react";
import { useRole } from "../hooks/hooks";
import {useRouter } from "next/navigation";

const RoleProtectedRoute = ({
  children,
  allowRoles,
}: {
  children: React.ReactNode;
  allowRoles: string[];
}) => {
  const role = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      router.replace("/login");
    }
  }, [role, router]);

  if (!role) {
    return null;
  }

  if (!allowRoles.includes(role)) {
    return (
      <div>
        Access Denied. You do not have permission to view this page.
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;