'use client';

import { useState } from 'react';
import { Field } from '@/lib/home';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

export default function ForgetPasswordForm() {
  const [formData, setFormData] = useState<FormData>({
    email: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'ইমেইল আবশ্যক';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'সঠিক ইমেইল ঠিকানা দিন';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || 'কিছু ভুল হয়েছে। আবার চেষ্টা করুন।' });
        return;
      }

      // Success
      setIsSuccess(true);
      
    } catch (error) {
      console.error('Forgot password error:', error);
      setErrors({ general: 'রিসেট লিংক পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Send className="h-8 w-8 text-green-600" />
        </div>

        {/* Success Message */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">ইমেইল পাঠানো হয়েছে!</h3>
          <p className="text-gray-600">
            আপনার ইমেইলে পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে।
            <br />
            অনুগ্রহ করে আপনার ইনবক্স চেক করুন।
          </p>
        </div>

        {/* Back to Login */}
        <Link href="/auth/login">
          <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <ArrowLeft className="h-5 w-5" />
            লগইন পেজে ফিরে যান
          </button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Info Message */}
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
        আপনার ইমেইল ঠিকানা দিন। আমরা আপনাকে পাসওয়ার্ড রিসেট করার লিংক পাঠাবো।
      </div>

      {/* General Error */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      {/* Email Field */}
      <Field label="ইমেইল ঠিকানা" error={errors.email ? { message: errors.email } : undefined}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="আপনার ইমেইল ঠিকানা দিন"
            disabled={isLoading}
          />
        </div>
      </Field>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-semibold transition-all ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            পাঠানো হচ্ছে...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            রিসেট লিংক পাঠান
          </>
        )}
      </button>

      {/* Back to Login Link */}
      <div className="text-center">
        <Link 
          href="/auth/login" 
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          লগইন পেজে ফিরে যান
        </Link>
      </div>

    </form>
  );
}
