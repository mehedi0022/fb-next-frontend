import { Shield, Loader2 } from 'lucide-react';

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <div className="text-center">
        <div className="mb-4 relative">
          <Shield className="w-12 h-12 text-green-600 mx-auto mb-2" />
          <Loader2 className="w-6 h-6 text-green-400 animate-spin absolute -top-1 -right-1" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          প্রমাণীকরণ হচ্ছে...
        </h2>
        <p className="text-gray-600">
          অনুগ্রহ করে অপেক্ষা করুন
        </p>
      </div>
    </div>
  );
}