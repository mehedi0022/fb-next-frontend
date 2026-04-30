"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Field, getPasswordStrength } from "@/lib/home";
import {
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  AlertCircle,
  Save,
} from "lucide-react";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/appstore/modules/(auth)/reset-password/api";

// types
interface FormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [
    resetPassword,
    {
      isLoading: isResetting,
      error: resetPasswordError,
      isError: isResetPasswordError,
    },
  ] = useResetPasswordMutation();

  // ---------- React Hook Form ----------
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // setError,
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ---------- Watched Values ----------
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // ---------- Derived Values ----------
  const passwordStrength = useMemo(
    () => getPasswordStrength(password || ""),
    [password],
  );

  const isPasswordMatch =
    password && confirmPassword && password === confirmPassword;

  // ---------- Toggles ----------
  const togglePassword = useCallback(() => setShowPassword((p) => !p), []);
  const toggleConfirmPassword = useCallback(
    () => setShowConfirmPassword((p) => !p),
    [],
  );

  // Submit handler
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await resetPassword({
        token,
        password: data.password,
      }).unwrap();

      toast.success("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      console.error(error);
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle className="text-green-500 w-14 h-14" />
        <p className="text-gray-800 font-semibold text-lg">
          পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!
        </p>
        <p className="text-sm text-gray-500">লগইন পেজে নিয়ে যাওয়া হচ্ছে...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <AlertCircle className="text-red-500 w-14 h-14" />
        <p className="text-gray-800 font-semibold text-lg">
          লিংকটি অকার্যকর বা মেয়াদ উত্তীর্ণ
        </p>
        <p className="text-sm text-gray-500">
          দয়া করে আবার পাসওয়ার্ড রিসেট অনুরোধ করুন।
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ── API Error Banner ── */}
      {isResetPasswordError &&
        resetPasswordError &&
        "data" in resetPasswordError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {
              "লিংকটি ইতিমধ্যে ব্যবহার করা হয়েছে বা মেয়াদ উত্তীর্ণ। দয়া করে আবার পাসওয়ার্ড রিসেট অনুরোধ করুন।"
            }
          </div>
        )}

      {/* ── New Password ── */}
      <Field label="নতুন পাসওয়ার্ড *" error={errors.password}>
        <div className="relative">
          <Lock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register("password", {
              required: "পাসওয়ার্ড আবশ্যক",
              minLength: {
                value: 8,
                message: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
              },
            })}
            className={`input !pl-10 !pr-10 ${errors.password ? "border-red-500" : ""}`}
            placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={togglePassword}
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

        {/* Strength Bar */}
        {password && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${passwordStrength.bg}`}
                style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
              />
            </div>
            <span className={`text-xs ${passwordStrength.color}`}>
              {passwordStrength.text}
            </span>
          </div>
        )}
      </Field>

      {/* ── Confirm Password ── */}
      <Field label="পাসওয়ার্ড নিশ্চিত করুন *" error={errors.confirmPassword}>
        <div className="relative">
          <Lock className="input-icon" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "পাসওয়ার্ড নিশ্চিত করুন",
              validate: (value) => value === password || "পাসওয়ার্ড মিলছে না",
            })}
            className={`input !pl-10 !pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
            placeholder="পাসওয়ার্ড আবার লিখুন"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={toggleConfirmPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={isLoading}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>

        {/* Match Indicator */}
        {isPasswordMatch && (
          <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            পাসওয়ার্ড মিলেছে
          </div>
        )}
      </Field>

      {/* ── Submit Button ── */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-semibold transition-all ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
        >
          {isLoading || isResetting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              রিসেট হচ্ছে...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              পাসওয়ার্ড রিসেট করুন
            </>
          )}
        </button>
      </div>
    </form>
  );
}
