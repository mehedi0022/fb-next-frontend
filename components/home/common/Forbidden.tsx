"use client";

import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
            <ShieldAlert size={40} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          403
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Access Forbidden
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          You don’t have permission to access this page. Please check your
          credentials or contact the administrator.
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-all duration-200"
          >
            <Home size={18} />
            Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-orange-400 text-orange-500 hover:bg-orange-50 px-5 py-2.5 rounded-lg transition-all duration-200"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}