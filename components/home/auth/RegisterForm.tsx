"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Field } from "@/lib/home";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  User,
  Globe,
  MapPin,
  Building,
  UserPlus,
  Building2,
  CheckCircle,
  AlertCircle,
  StoreIcon,
  Users,
} from "lucide-react";
import { useGetBranchesQuery } from "@/appstore/modules/branch/api";
import { useGetBatchesQuery } from "@/appstore/modules/batch/api";

// ==================== TYPES ====================
interface FormData {
  phone: string;
  name: string;
  email: string;
  shopName: string;
  address: string;
  district: string;
  domain: string;
  branchId: string;
  batchId: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

// ==================== CONSTANTS ====================

const BANGLADESH_DISTRICTS = [
  "ঢাকা",
  "চট্টগ্রাম",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "সিলেট",
  "রংপুর",
  "ময়মনসিংহ",
  "কুমিল্লা",
  "ফরিদপুর",
  "গাজীপুর",
  "গোপালগঞ্জ",
  "জামালপুর",
  "কিশোরগঞ্জ",
  "মাদারীপুর",
  "মানিকগঞ্জ",
  "মুন্শিগঞ্জ",
  "নারায়ণগঞ্জ",
  "নরসিংদী",
  "রাজবাড়ী",
  "শরীয়তপুর",
  "টাঙ্গাইল",
  "বান্দরবান",
  "ব্রাহ্মণবাড়িয়া",
  "চাঁদপুর",
  "কক্সবাজার",
  "ফেনী",
  "খাগড়াছড়ি",
  "লক্ষ্মীপুর",
  "নোয়াখালী",
  "রাঙ্গামাটি",
  "বাগেরহাট",
  "চুয়াডাঙ্গা",
  "যশোর",
  "ঝিনাইদহ",
  "কুষ্টিয়া",
  "মাগুরা",
  "মেহেরপুর",
  "নড়াইল",
  "সাতক্ষীরা",
  "হবিগঞ্জ",
  "মৌলভীবাজার",
  "সুনামগঞ্জ",
  "বগুড়া",
  "জয়পুরহাট",
  "নওগাঁ",
  "নাটোর",
  "চাঁপাইনবাবগঞ্জ",
  "পাবনা",
  "সিরাজগঞ্জ",
  "দিনাজপুর",
  "গাইবান্ধা",
  "কুড়িগ্রাম",
  "লালমনিরহাট",
  "নীলফামারী",
  "পঞ্চগড়",
  "ঠাকুরগাঁও",
  "ভোলা",
  "ঝালকাঠি",
  "পটুয়াখালী",
  "পিরোজপুর",
  "নেত্রকোণা",
  "শেরপুর",
];

const VALIDATION_PATTERNS = {
  phone: /^(\+88)?01[3-9]\d{8}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  domain: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
} as const;

const ERROR_MESSAGES = {
  required: {
    phone: "মোবাইল নাম্বার আবশ্যক",
    name: "নাম আবশ্যক",
    shopName: "শপের নাম আবশ্যক",
    branchId: "ব্রাঞ্চ নির্বাচন করুন",
    batchId: "ব্যাচ নির্বাচন করুন",
    password: "পাসওয়ার্ড আবশ্যক",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    agreeToTerms: "শর্তাবলী মেনে নিতে হবে",
  },
  invalid: {
    phone: "সঠিক বাংলাদেশী মোবাইল নাম্বার দিন",
    email: "সঠিক ইমেইল ঠিকানা দিন",
    domain: "সঠিক ওয়েবসাইট ঠিকানা দিন",
    passwordLength: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
    passwordMismatch: "পাসওয়ার্ড মিলছে না",
    nameLength: "নাম কমপক্ষে ২ অক্ষরের হতে হবে",
  },
} as const;

// ==================== UTILITIES ====================
class PasswordStrengthCalculator {
  static calculate(password: string): number {
    let strength = 0;

    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  }

  static getStrengthInfo(strength: number): { text: string; color: string } {
    switch (strength) {
      case 0:
      case 1:
        return { text: "দুর্বল", color: "text-red-500" };
      case 2:
        return { text: "মাঝারি", color: "text-yellow-500" };
      case 3:
        return { text: "ভালো", color: "text-blue-500" };
      case 4:
      case 5:
        return { text: "শক্তিশালী", color: "text-green-500" };
      default:
        return { text: "", color: "" };
    }
  }
}

class RegistrationService {
  static async submitRegistration(
    formData: FormData,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would make the actual API call
      console.log("Registration data:", formData);

      return { success: true };
    } catch {
      return {
        success: false,
        message: "রেজিস্ট্রেশনে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      };
    }
  }
}

// ==================== MAIN COMPONENT ====================
export default function RegisterForm() {
  const router = useRouter();
  const { data: branches, isError: branchesError } = useGetBranchesQuery();
  const { data: batches, isError: batchesError } = useGetBatchesQuery();
  console.log({ branches, branchesError, batches, batchesError });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormData>();

  // State Management
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Watch values
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Password strength
  const passwordStrength = useMemo(() => {
    const strength = PasswordStrengthCalculator.calculate(password || "");
    return {
      strength,
      ...PasswordStrengthCalculator.getStrengthInfo(strength),
    };
  }, [password]);

  // Password match
  const isPasswordMatch = password === confirmPassword && confirmPassword;

  // Submit handler
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const result = await RegistrationService.submitRegistration(data);

    if (result.success) {
      router.push("/login?registered=true");
    } else {
      setError("agreeToTerms", { message: result.message });
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  // Render Helpers
  const renderPasswordStrengthIndicator = () => {
    if (!password) return null;

    return (
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                passwordStrength.strength <= 1
                  ? "bg-red-500"
                  : passwordStrength.strength === 2
                    ? "bg-yellow-500"
                    : passwordStrength.strength === 3
                      ? "bg-blue-500"
                      : "bg-green-500"
              }`}
              style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
            />
          </div>
          <span className={`text-xs ${passwordStrength.color}`}>
            {passwordStrength.text}
          </span>
        </div>
      </div>
    );
  };

  const renderPasswordMatchIndicator = () => {
    if (!isPasswordMatch) return null;

    return (
      <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
        <CheckCircle className="w-4 h-4" />
        পাসওয়ার্ড মিলেছে
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* General Error */}
      {errors.agreeToTerms && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errors.agreeToTerms.message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Phone */}
        <Field label="মোবাইল নাম্বার *" error={errors.phone}>
          <div className="relative">
            <Phone className="input-icon" />
            <input
              type="tel"
              {...register("phone", {
                required: ERROR_MESSAGES.required.phone,
                pattern: {
                  value: VALIDATION_PATTERNS.phone,
                  message: ERROR_MESSAGES.invalid.phone,
                },
              })}
              className={`input !pl-10 ${errors.phone ? "border-red-500" : ""}`}
              placeholder="01XXXXXXXXX"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* Name */}
        <Field label="পূর্ণ নাম *" error={errors.name}>
          <div className="relative">
            <User className="input-icon" />
            <input
              type="text"
              {...register("name", {
                required: ERROR_MESSAGES.required.name,
                minLength: {
                  value: 2,
                  message: ERROR_MESSAGES.invalid.nameLength,
                },
              })}
              className={`input !pl-10 ${errors.name ? "border-red-500" : ""}`}
              placeholder="আপনার পূর্ণ নাম লিখুন"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* Email */}
        <Field label="ইমেইল ঠিকানা" error={errors.email}>
          <div className="relative">
            <Mail className="input-icon" />
            <input
              type="email"
              {...register("email", {
                pattern: {
                  value: VALIDATION_PATTERNS.email,
                  message: ERROR_MESSAGES.invalid.email,
                },
              })}
              className={`input !pl-10 ${errors.email ? "border-red-500" : ""}`}
              placeholder="example@email.com"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* Shop Name */}
        <Field label="শপের নাম *" error={errors.shopName}>
          <div className="relative">
            <StoreIcon className="input-icon text-blue-600" />
            <input
              type="text"
              {...register("shopName", {
                required: ERROR_MESSAGES.required.shopName,
              })}
              className={`input !pl-10 ${errors.shopName ? "border-red-500" : ""}`}
              placeholder="আপনার শপের নাম"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* Address */}
        <Field label="সম্পূর্ণ ঠিকানা" error={errors.address}>
          <div className="relative">
            <MapPin className="input-icon" />
            <input
              type="text"
              {...register("address")}
              className={`input !pl-10 ${errors.address ? "border-red-500" : ""}`}
              placeholder="বাড়ি/রোড নং, এলাকা, উপজেলা"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* District */}
        <Field label="জেলা" error={errors.district}>
          <div className="relative">
            <Building2 className="input-icon" />
            <select
              {...register("district")}
              className={`input !pl-10 ${errors.district ? "border-red-500" : ""}`}
              disabled={isLoading}
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {BANGLADESH_DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </Field>

        {/* Domain */}
        <Field label="ওয়েবসাইট/ডোমেইন" error={errors.domain}>
          <div className="relative">
            <Globe className="input-icon" />
            <input
              type="url"
              {...register("domain", {
                pattern: {
                  value: VALIDATION_PATTERNS.domain,
                  message: ERROR_MESSAGES.invalid.domain,
                },
              })}
              className={`input !pl-10 ${errors.domain ? "border-red-500" : ""}`}
              placeholder="https://www.yourshop.com"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* Branch */}
        <Field
          label="ব্রাঞ্চ নির্বাচন *"
          error={{
            message:
              errors.branchId?.message ||
              (branchesError ? "ব্রাঞ্চ লোড করতে সমস্যা হয়েছে" : undefined),
          }}
        >
          <div className="relative">
            <Building className="input-icon" />
            <select
              {...register("branchId", {
                required: ERROR_MESSAGES.required.branchId,
              })}
              className={`input !pl-10 ${errors.branchId || branchesError ? "border-red-500" : ""}`}
              disabled={isLoading || branchesError}
            >
              <option value="">ব্রাঞ্চ নির্বাচন করুন</option>
              {branches &&
                branches.branches.map((branch: any) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branchName}
                  </option>
                ))}
            </select>
          </div>
        </Field>

        {/* Batch */}
        <Field
          label="ব্যাচ নির্বাচন *"
          error={{
            message:
              errors.batchId?.message ||
              (batchesError ? "ব্যাচ লোড করতে সমস্যা হয়েছে" : undefined),
          }}
        >
          <div className="relative">
            <Users className="input-icon" />
            <select
              {...register("batchId", {
                required: ERROR_MESSAGES.required.batchId,
              })}
              className={`input !pl-10 ${errors.batchId || batchesError ? "border-red-500" : ""}`}
              disabled={isLoading || batchesError}
            >
              <option value="">ব্যাচ নির্বাচন করুন</option>
              {batches &&
                batches.batches.map((batch: any) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.batchName}
                  </option>
                ))}
            </select>
          </div>
        </Field>

        {/* Password */}
        <Field label="পাসওয়ার্ড *" error={errors.password}>
          <div className="relative">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: ERROR_MESSAGES.required.password,
                minLength: {
                  value: 6,
                  message: ERROR_MESSAGES.invalid.passwordLength,
                },
              })}
              className={`input !pl-10 !pr-10 ${errors.password ? "border-red-500" : ""}`}
              placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
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
          {renderPasswordStrengthIndicator()}
        </Field>

        {/* Confirm Password */}
        <Field label="পাসওয়ার্ড নিশ্চিত করুন *" error={errors.confirmPassword}>
          <div className="relative">
            <Lock className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: ERROR_MESSAGES.required.confirmPassword,
                validate: (value) =>
                  value === watch("password") ||
                  ERROR_MESSAGES.invalid.passwordMismatch,
              })}
              className={`input !pl-10 !pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
              placeholder="পাসওয়ার্ড আবার লিখুন"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
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
          {renderPasswordMatchIndicator()}
        </Field>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register("agreeToTerms", {
              required: ERROR_MESSAGES.required.agreeToTerms,
            })}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={isLoading}
          />
          <label className="text-sm text-gray-700 leading-relaxed">
            আমি{" "}
            <Link
              href="/terms-and-conditions"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              শর্তাবলী
            </Link>{" "}
            এবং{" "}
            <Link
              href="/privacy-policy"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              গোপনীয়তা নীতি
            </Link>{" "}
            পড়েছি এবং সম্মত আছি।
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
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
              রেজিস্ট্রেশন হচ্ছে...
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              রেজিস্টার করুন
            </>
          )}
        </button>
      </div>

      {/* Login Link */}
      <div className="text-center pt-4 border-t">
        <p className="text-gray-600 text-sm">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            লগইন করুন
          </Link>
        </p>
      </div>
    </form>
  );
}
