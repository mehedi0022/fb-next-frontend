"use client";

import { useAppSelector } from "@/appstore/hooks/hooks";
import { selectUser, selectSessionStatus } from "@/appstore/slices/sessionSlice";

export default function AuthStatus() {
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectSessionStatus);

  if (status === "loading") {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-blue-700">Checking authentication...</span>
        </div>
      </div>
    );
  }

  if (status === "authenticated" && user) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-green-800 font-semibold">স্বাগতম, {user.name || user.email}!</h3>
            <p className="text-green-600 text-sm">আপনি সফলভাবে লগইন করেছেন</p>
          </div>
          <div className="text-green-600 text-sm">
            Role: {user.role || 'User'}
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-yellow-800 font-semibold">আপনি লগইন করেননি</h3>
            <p className="text-yellow-600 text-sm">সব ফিচার ব্যবহার করতে লগইন করুন</p>
          </div>
          <a 
            href="/login" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            লগইন করুন
          </a>
        </div>
      </div>
    );
  }

  return null;
}