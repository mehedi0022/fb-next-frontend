import { Container } from '@/lib/home';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import TwoFactorForm from './TwoFactorForm';

export default function TwoFactorAuth({ callbackUrl }: { callbackUrl?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-center text-white">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2">দুই-ধাপ যাচাইকরণ</h1>
            <p className="text-green-100 text-sm">
              আপনার অ্যাকাউন্টের নিরাপত্তার জন্য
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            
            {/* Info */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                যাচাইকরণ কোড প্রবেশ করুন
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                আমরা আপনার ইমেইল ঠিকানায় একটি ৬ সংখ্যার যাচাইকরণ কোড পাঠিয়েছি। 
                অনুগ্রহ করে নিচে কোডটি প্রবেশ করুন।
              </p>
            </div>

            {/* Form */}
            <TwoFactorForm callbackUrl={callbackUrl} />

            {/* Footer */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center">
                <Link 
                  href="/login" 
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  লগইন পেজে ফিরে যান
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Security Notice */}
        <div className="max-w-md mx-auto mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">নিরাপত্তা টিপস:</p>
              <ul className="text-xs space-y-1 text-yellow-700">
                <li>• কোডটি কারো সাথে শেয়ার করবেন না</li>
                <li>• কোডটি ১০ মিনিটের জন্য বৈধ</li>
                <li>• সন্দেহজনক কার্যকলাপ দেখলে আমাদের জানান</li>
              </ul>
            </div>
          </div>
        </div>

      </Container>
    </div>
  );
}