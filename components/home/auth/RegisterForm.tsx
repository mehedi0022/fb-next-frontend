"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Field, getPasswordStrength } from "@/lib/home";
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
import Link from "next/link";
import { useRegisterUserMutation } from "@/appstore/modules/(auth)/registers/api";
import { toast } from "react-toastify";
import { BatchInBranch } from "../../../lib/home/types";

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

const PHONE_PATTERN = /^(\+88)?01[3-9]\d{8}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMAIN_PATTERN =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// ==================== COMPONENT ====================
export default function RegisterForm() {
  const router = useRouter();
  const { data: branches, isError: branchesError } = useGetBranchesQuery();
  const [registerUser] = useRegisterUserMutation();


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // map branch
  const branchMap = useMemo(() => {
    if (!branches?.branches) return new Map();

    return new Map(branches.branches.map((b) => [b.id, b]));
  }, [branches]);

  // watch branchId
  const branchesId = watch("branchId");
  const selectedBranch = branchMap.get(Number(branchesId));

  const passwordStrength = useMemo(
    () => getPasswordStrength(password || ""),
    [password],
  );
  const isPasswordMatch =
    password && confirmPassword && password === confirmPassword;

  const togglePassword = useCallback(() => setShowPassword((p) => !p), []);
  const toggleConfirmPassword = useCallback(
    () => setShowConfirmPassword((p) => !p),
    [],
  );

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // main user data
      const user = {
        phone: data?.phone,
        name: data?.name,
        email: data?.email,
        shopName: data?.shopName,
        address: data?.address,
        district: data?.district,
        domain: data?.domain,
        branchId: Number(data?.branchId),
        batchId: Number(data?.batchId),
        password: data?.password,
      };

      // call api
      const result = await registerUser(user);

      // handle response
      if (result?.data?.success) {
        toast.success("রেজিস্ট্রেশন সফল হয়েছে! এখন লগইন করুন।");

        router.push("/login?registered=true");
      } else {
        const errorMessage =
          result?.error && "data" in result.error
            ? (result.error.data as { message?: string })?.message
            : undefined;

        toast.error(
          errorMessage || "রেজিস্ট্রেশনে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        );

        setError("agreeToTerms", {
          message:
            errorMessage || "রেজিস্ট্রেশনে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        });
      }

      // console.log("Registration data:", { user, result });
    } catch {
      // console.log(isRegisterError);
      setError("agreeToTerms", {
        message: "রেজিস্ট্রেশনে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    } finally {
      setIsLoading(false);
    }
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
                required: "মোবাইল নাম্বার আবশ্যক",
                pattern: {
                  value: PHONE_PATTERN,
                  message: "সঠিক বাংলাদেশী মোবাইল নাম্বার দিন",
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
                required: "নাম আবশ্যক",
                minLength: {
                  value: 2,
                  message: "নাম কমপক্ষে ২ অক্ষরের হতে হবে",
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
                  value: EMAIL_PATTERN,
                  message: "সঠিক ইমেইল ঠিকানা দিন",
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
              {...register("shopName", { required: "শপের নাম আবশ্যক" })}
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
              {BANGLADESH_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
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
                  value: DOMAIN_PATTERN,
                  message: "সঠিক ওয়েবসাইট ঠিকানা দিন",
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
              {...register("branchId", { required: "ব্রাঞ্চ নির্বাচন করুন" })}
              className={`input !pl-10 ${errors.branchId || branchesError ? "border-red-500" : ""}`}
              disabled={isLoading || branchesError}
            >
              <option value="">ব্রাঞ্চ নির্বাচন করুন</option>
              {branches?.branches
                .filter((branch) => branch?.status === "active")
                .map((branch) => (
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
              errors.batchId?.message || (branchesError ? "" : undefined),
          }}
        >
          <div className="relative">
            <Users className="input-icon" />
            <select
              {...register("batchId", { required: "ব্যাচ নির্বাচন করুন" })}
              className={`input !pl-10 ${errors.batchId || branchesError ? "border-red-500" : ""}`}
              disabled={isLoading || branchesError}
            >
              <option value="">ব্যাচ নির্বাচন করুন</option>

              {!selectedBranch && (
                <option value="" disabled>
                  প্রথমে ব্রাঞ্চ নির্বাচন করুন
                </option>
              )}

              {selectedBranch &&
                selectedBranch?.batches
                  ?.filter((batch: BatchInBranch) => batch?.status === "active")
                  .map((batch: BatchInBranch) => (
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

        {/* Confirm Password */}
        <Field label="পাসওয়ার্ড নিশ্চিত করুন *" error={errors.confirmPassword}>
          <div className="relative">
            <Lock className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "পাসওয়ার্ড নিশ্চিত করুন",
                validate: (value) =>
                  value === password || "পাসওয়ার্ড মিলছে না",
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
          {isPasswordMatch && (
            <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              পাসওয়ার্ড মিলেছে
            </div>
          )}
        </Field>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register("agreeToTerms", { required: "শর্তাবলী মেনে নিতে হবে" })}
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

      {/* Submit */}
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
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
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
