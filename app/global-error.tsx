'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
          <div className="max-w-md w-full mx-auto text-center px-6">
            <div className="mb-8">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                সিস্টেম ত্রুটি!
              </h1>
              <p className="text-gray-600 mb-4">
                একটি গুরুতর ত্রুটি ঘটেছে। পেজটি পুনরায় লোড করার চেষ্টা করুন।
              </p>
              
              {error.digest && (
                <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <button
              onClick={reset}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw size={20} />
              পুনরায় লোড করুন
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}