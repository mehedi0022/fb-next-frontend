'use client';

import { useEffect } from 'react';
import { Shield, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Auth error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <div className="max-w-md w-full mx-auto text-center px-6">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            লগইন সমস্যা!
          </h1>
          <p className="text-gray-600 mb-4">
            লগইন প্রক্রিয়ায় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <RefreshCw size={20} />
            আবার চেষ্টা করুন
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors ml-4"
          >
            <Home size={20} />
            হোম পেজে যান
          </Link>
        </div>
      </div>
    </div>
  );
}