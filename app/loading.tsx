import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="mb-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          লোড হচ্ছে...
        </h2>
        <p className="text-gray-600">
          অনুগ্রহ করে অপেক্ষা করুন
        </p>
      </div>
    </div>
  );
}