"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/appstore/api/authApi";
import { Field } from "@/lib/home";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignInForm() {
  const [login] = useLoginMutation();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "ইমেইল আবশ্যক";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা দিন";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "পাসওয়ার্ড আবশ্যক";
    } else if (formData.password.length < 6) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
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
      const res = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // ✅ If OTP sent
      if (res?.message === "OTP sent to email") {
        sessionStorage.setItem("tempEmail", formData.email);
        router.push("/login/two-factor");
        return;
      }

      // ✅ If backend directly logs in (optional case)
      router.push("/");
    } catch (err: unknown) {
      console.error("Login error:", err);

      setErrors({
        general: err instanceof Error ? err.message : "ভুল ইমেইল বা পাসওয়ার্ড",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      {/* Email Field */}
      <Field
        label="ইমেইল ঠিকানা"
        error={errors.email ? { message: errors.email } : undefined}
      >
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
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="আপনার ইমেইল ঠিকানা দিন"
            disabled={isLoading}
          />
        </div>
      </Field>

      {/* Password Field */}
      <Field
        label="পাসওয়ার্ড"
        error={errors.password ? { message: errors.password } : undefined}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="আপনার পাসওয়ার্ড দিন"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </Field>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={isLoading}
          />
          <span className="ml-2 text-sm text-gray-600">আমাকে মনে রাখুন</span>
        </label>
        <Link
          href="/auth/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          পাসওয়ার্ড ভুলে গেছেন?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-semibold transition-all ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            লগইন হচ্ছে...
          </>
        ) : (
          <>
            <LogIn className="h-5 w-5" />
            লগইন করুন
          </>
        )}
      </button>

      {/* Demo Credentials */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
        <strong>ডেমো অ্যাকাউন্ট:</strong>
        <br />
        যেকোনো ইমেইল এবং ৬+ অক্ষরের পাসওয়ার্ড দিন
        <br />
        (2FA পেজে রিডাইরেক্ট হবে)
      </div>
    </form>
  );
}
