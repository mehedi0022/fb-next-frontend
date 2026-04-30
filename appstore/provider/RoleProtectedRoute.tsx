"use client";

import React from "react";
import { useRole } from "../hooks/hooks";

const RoleProtectedRoute = ({
  children,
  allowRoles,
}: {
  children: React.ReactNode;
  allowRoles: string[];
}) => {
  const role = useRole();

  console.log("User role:", role);

  if (!role) {
    return <div>Access Denied. You must be logged in to view this page.</div>;
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
