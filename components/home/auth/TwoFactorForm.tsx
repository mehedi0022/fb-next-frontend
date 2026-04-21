"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { useVerifyOtpMutation } from "@/appstore/api/authApi";

// Zod validation schemas for regex patterns
const singleDigitSchema = z
  .string()
  .regex(/^\d?$/, "শুধুমাত্র সংখ্যা প্রবেশ করুন");
const pastedOtpSchema = z
  .string()
  .regex(/^\d{6}$/, "সম্পূর্ণ ৬ সংখ্যার কোড প্রয়োজন");

export default function TwoFactorForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyOtp] = useVerifyOtpMutation();

  // Get email from sessionStorage
  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window !== "undefined" && window.sessionStorage) {
      const tempEmail = sessionStorage.getItem("tempEmail");
      if (tempEmail) {
        setEmail(tempEmail);
      } else {
        // Redirect back to login if no email found
        router.push("/login");
      }
    } else {
      // If sessionStorage is not available, redirect to login
      router.push("/login");
    }
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}: ${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP input change with Zod validation
  const handleOtpChange = (index: number, value: string) => {
    // validate single digit with Zod
    const digitValidation = singleDigitSchema.safeParse(value);

    if (!digitValidation.success) {
      const errorMessage =
        digitValidation.error.issues[0]?.message ||
        "শুধুমাত্র সংখ্যা প্রবেশ করুন";
      setError(errorMessage);
      return;
    }

    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste with Zod validation
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    // Validate pasted data with Zod
    const pasteValidation = pastedOtpSchema.safeParse(pastedData);

    if (!pasteValidation.success) {
      const errorMessage =
        pasteValidation.error.issues[0]?.message ||
        "সম্পূর্ণ ৬ সংখ্যার কোড প্রয়োজন";
      setError(errorMessage);
      return;
    }

    // If validation passes, set the OTP
    const newOtp = pastedData.split("");
    setOtp(newOtp);
    setError("");

    // Focus the last input
    inputRefs.current[5]?.focus();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("সম্পূর্ণ ৬ সংখ্যার কোড প্রবেশ করুন");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await verifyOtp({ email, otp: otpString }).unwrap();

      sessionStorage.removeItem("tempEmail");
      router.replace("/");
    } catch {
      setError("ভুল যাচাইকরণ কোড। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend code
  const handleResendCode = async () => {
    setTimeLeft(600); // Reset timer
    setError("");
    setOtp(["", "", "", "", "", ""]);

    // Focus first input
    inputRefs.current[0]?.focus();

    // Here you would make API call to resend code
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Display */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          কোড পাঠানো হয়েছে:{" "}
          <span className="font-semibold text-gray-800">{email}</span>
        </p>
      </div>

      {/* Timer */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          কোড মেয়াদ শেষ হবে:{" "}
          <span className="font-mono font-semibold text-red-600">
            {formatTime(timeLeft)}
          </span>
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Debug Error Display */}
      {error && (
        <div className="text-xs text-gray-500 text-center">
          Debug: &ldquo;{error}&rdquo;
        </div>
      )}

      {/* OTP Input */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 text-center">
          যাচাইকরণ কোড
        </label>
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                error ? "border-red-500" : "border-gray-300"
              } ${digit ? "bg-blue-50 border-blue-300" : ""}`}
              disabled={isLoading}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || otp.join("").length !== 6}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-semibold transition-all ${
          isLoading || otp.join("").length !== 6
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        }`}>
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            যাচাই করা হচ্ছে...
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5" />
            যাচাই করুন
          </>
        )}
      </button>

      {/* Resend Code */}
      {timeLeft === 0 ? (
        <button
          type="button"
          onClick={handleResendCode}
          className="w-full py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
          নতুন কোড পাঠান
        </button>
      ) : (
        <p className="text-center text-sm text-gray-500">
          নতুন কোড পেতে {formatTime(timeLeft)} অপেক্ষা করুন
        </p>
      )}
    </form>
  );
}
