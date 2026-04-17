import { Package, Loader2 } from 'lucide-react';

export default function ProductsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="mb-4 relative">
          <Package className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <Loader2 className="w-6 h-6 text-blue-400 animate-spin absolute -top-1 -right-1" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          প্রোডাক্ট লোড হচ্ছে...
        </h2>
        <p className="text-gray-600">
          সকল প্রোডাক্ট তথ্য আনা হচ্ছে
        </p>
      </div>
    </div>
  );
}