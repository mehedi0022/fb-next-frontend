import {Container } from '@/lib';
import Image from 'next/image';
import Link from 'next/link';
import SignInForm from './SignInForm';

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <Container>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            
            {/* Left Side - Image */}
            <div className="hidden md:block relative bg-gradient-to-br from-blue-600 to-blue-800">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative h-full flex items-center justify-center p-8">
                <div className="text-center text-white">
                  <Image 
                    src='/assets/LogIn.png' 
                    alt='signin' 
                    width={400} 
                    height={400} 
                    className='object-contain mb-6 mx-auto'
                  />
                  <h2 className="text-2xl font-bold mb-4">স্বাগতম!</h2>
                  <p className="text-blue-100">
                    আপনার অ্যাকাউন্টে লগইন করুন এবং আমাদের সেবা উপভোগ করুন
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 md:p-12">
              <div className="max-w-md mx-auto">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">রিসেলার লগইন করুন</h1>
                  <p className="text-gray-600">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
                </div>

                {/* Mobile Image */}
                <div className="md:hidden text-center mb-8">
                  <Image 
                    src='/assets/LogIn.png' 
                    alt='signin' 
                    width={200} 
                    height={200} 
                    className='object-contain mx-auto'
                  />
                </div>

                {/* Form */}
                <SignInForm />

                {/* Footer Links */}
                <div className="mt-8 text-center space-y-4">
                  <Link 
                    href="/forgot-password" 
                    className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </Link>
                  
                  <div className="text-gray-600 text-sm">
                    অ্যাকাউন্ট নেই?{' '}
                    <Link 
                      href="/register" 
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      রেজিস্টার করুন
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}