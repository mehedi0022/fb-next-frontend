import ForgetPasswordForm from '@/components/home/auth/ForgetPasswordForm';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'পাসওয়ার্ড ভুলে গেছেন - Freelancer Bangladesh',
  description: 'আপনার পাসওয়ার্ড রিসেট করুন',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-blue-600">
              Freelancer Bangladesh
            </h1>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            পাসওয়ার্ড ভুলে গেছেন?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            চিন্তা করবেন না, আমরা আপনাকে সাহায্য করবো
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-100">
          <ForgetPasswordForm />
        </div>

        {/* Footer Links */}
        <div className="text-center text-sm text-gray-600">
          <span>নতুন ইউজার? </span>
          <Link 
            href="/auth/register" 
            className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            রেজিস্ট্রেশন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
