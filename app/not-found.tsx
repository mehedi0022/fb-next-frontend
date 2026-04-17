'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-auto text-center px-6">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            পেজ খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-gray-600">
            আপনি যে পেজটি খুঁজছেন সেটি বিদ্যমান নেই বা সরানো হয়েছে।
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home size={20} />
            হোম পেজে ফিরে যান
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors ml-4"
          >
            <ArrowLeft size={20} />
            পূর্বের পেজে ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );
}