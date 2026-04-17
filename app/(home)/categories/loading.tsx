import { Grid3X3, Loader2 } from 'lucide-react';

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="text-center">
        <div className="mb-4 relative">
          <Grid3X3 className="w-12 h-12 text-purple-600 mx-auto mb-2" />
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin absolute -top-1 -right-1" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          ক্যাটাগরি লোড হচ্ছে...
        </h2>
        <p className="text-gray-600">
          সকল ক্যাটাগরি তথ্য আনা হচ্ছে
        </p>
      </div>
    </div>
  );
}