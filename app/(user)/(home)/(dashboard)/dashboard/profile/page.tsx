"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Phone,
  Mail,
  Store,
  MapPin,
  Lock,
  Upload,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Field, PROFILE_DATA, ProfileFormState } from "@/lib/home";
import { useUpdatePasswordMutation } from "@/appstore/api/authApi";

const inputClass =
  "w-full rounded-xl border border-secondary py-2.5 pl-10 pr-4 text-sm text-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

type FormValues = ProfileFormState & {
  alternateMobile: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  shopLogo: File | null;
};

export default function ProfilePage() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("কোনো ফাইল নেই");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updatePassword] = useUpdatePasswordMutation()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      ...PROFILE_DATA,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      shopLogo: null,
    },
  });

  // const shopLogo = watch("shopLogo");

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setSuccess(false);
    const { email, currentPassword, newPassword } = data
    try {
      await updatePassword({
        email,
        currentPassword,
        newPassword,
      }).unwrap();

      // API CALL example
      await new Promise((r) => setTimeout(r, 1000));

      setSuccess(true);
      reset();
      setFileName("কোনো ফাইল নেই");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border shadow-2xl shadow-black/50">

          {/* Header */}
          <div className="border-b px-6 py-5">
            <h1 className="text-xl font-bold">My Profile</h1>
            <p className="text-sm">আপনার তথ্য সুন্দরভাবে আপডেট করুন</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Mobile */}
              <Field label="মোবাইল নাম্বার" icon={<Phone className="h-4 w-4" />}>
                <input {...register("mobile")} className={inputClass} />
              </Field>

              {/* Alternate Mobile */}
              <Field label="বিকল্প মোবাইল নাম্বার" icon={<Phone className="h-4 w-4" />}>
                <input {...register("alternateMobile")} className={inputClass} />
              </Field>

              {/* Name */}
              <Field label="নাম" icon={<User className="h-4 w-4" />}>
                <input {...register("name")} className={inputClass} />
              </Field>

              {/* Email */}
              <Field label="ইমেইল" icon={<Mail className="h-4 w-4" />}>
                <input type="email" {...register("email")} className={inputClass} />
              </Field>

              {/* Shop Name */}
              <Field label="শপ নাম" icon={<Store className="h-4 w-4" />}>
                <input {...register("shopName")} className={inputClass} />
              </Field>

              {/* Shop Logo */}
              <Field label="Shop Logo" icon={<Upload className="h-4 w-4" />}>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-secondary"
                >
                  <span className="border-r px-3 py-2 text-xs">ফাইল</span>
                  <span className="truncate px-3 text-sm">{fileName}</span>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setValue("shopLogo", file);
                    setFileName(file?.name || "কোনো ফাইল নেই");
                  }}
                />
              </Field>

              {/* Address */}
              <Field label="ঠিকানা" icon={<MapPin className="h-4 w-4" />}>
                <input {...register("address")} className={inputClass} />
              </Field>

              {/* Current Password */}
              <Field label="বর্তমান পাসওয়ার্ড" icon={<Lock className="h-4 w-4" />}>
                <input type="password" {...register("currentPassword")} className={inputClass} />
              </Field>

              {/* New Password */}
              <Field label="নতুন পাসওয়ার্ড" icon={<Lock className="h-4 w-4" />}>
                <input type="password" {...register("newPassword")} className={inputClass} />
              </Field>

              {/* Confirm Password */}
              <Field label="কনফার্ম পাসওয়ার্ড" icon={<Lock className="h-4 w-4" />}>
                <input type="password" {...register("confirmPassword")} className={inputClass} />
              </Field>
            </div>

            {/* Submit */}
            <div className="mt-6">
              {success && (
                <div className="mb-3 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                  <CheckCircle className="h-4 w-4" />
                  প্রোফাইল সফলভাবে আপডেট হয়েছে!
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    আপডেট হচ্ছে...
                  </>
                ) : (
                  "আপডেট করুন"
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}