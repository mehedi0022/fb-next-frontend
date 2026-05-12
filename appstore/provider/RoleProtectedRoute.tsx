"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/hooks";
import { usePathname, useRouter } from "next/navigation";
import ForbiddenPage from "@/components/home/common/Forbidden";
import { LoaderCircle } from "lucide-react";


const PremiumLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-4 border-blue-100"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderCircle className="h-10 w-10 animate-spin text-blue-600" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-800">
            Verifying Access
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
};


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
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    } else if (status === "authenticated" || status === "unauthenticated") {
      setIsLoading(false);
    }

    if (!user?.role || isLoggedOut) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, isLoggedOut, status, router, pathname]);

  if (isLoading) {
    return <PremiumLoader />;
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
