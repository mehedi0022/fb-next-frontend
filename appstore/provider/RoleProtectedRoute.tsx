"use client";

import React from "react";
import { useRole } from "../hooks/hooks";
import { usePathname, useRouter } from "next/navigation";

const RoleProtectedRoute = ({
  children,
  allowRoles,
}: {
  children: React.ReactNode;
  allowRoles: string[];
}) => {
  const role = useRole();
  const router = useRouter()
  const pathname = usePathname()

  if (!role) {
    router.replace(`/login`);
    return null; 
  }

  if (allowRoles.includes(role)) {
    return <div>{children}</div>;
  } else {
    return (
      <div>
        Access Denied. You do not have permission to view this page. forbidden
        user.
      </div>
    );
  }
};

export default RoleProtectedRoute;
