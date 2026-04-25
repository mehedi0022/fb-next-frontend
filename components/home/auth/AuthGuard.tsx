"use client";

import { useAppSelector } from "@/appstore/hooks/hooks";
import { selectIsAuthenticated, selectSessionStatus } from "@/appstore/slices/sessionSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectSessionStatus);
  const router = useRouter();

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Wait for auth check to complete
    if (status === "loading") return;
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [mounted, isAuthenticated, status, router]);

  // Don't render anything on server side
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show loading while checking auth
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}