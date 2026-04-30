"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { User, Phone, Mail, Store, MapPin, Lock, Upload, Loader2, CheckCircle } from "lucide-react";
import { Field, PROFILE_DATA, ProfileFormState } from "@/lib/home";

// ─── Field Component ──────────────────────────────────────────────────────────

const inputClass =
  "w-full rounded-xl border border-secondary py-2.5 pl-10 pr-4 text-sm text-slate-500 placeholder:text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileFormState>({
    ...PROFILE_DATA,
    newPassword: "",
    confirmPassword: "",
    shopLogo: null,
  });

  const [fileName, setFileName] = useState<string>("কোনো ফাইল নেই");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccess(false);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, shopLogo: file }));
    setFileName(file ? file.name : "কোনো ফাইল নেই");
    setSuccess(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Replace with your actual API call
      // const formData = new FormData();
      // Object.entries(form).forEach(([k, v]) => v && formData.append(k, v as string | Blob));
      // await fetch("/api/profile/update", { method: "POST", body: formData });

      await new Promise((r) => setTimeout(r, 1000)); // mock delay
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border   shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="border-b px-6 py-5">
            <h1 className="text-xl font-bold">My Profile</h1>
            <p className="mt-0.5 text-sm">আপনার তথ্য সুন্দরভাবে আপডেট করুন</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Mobile */}
              <Field label="মোবাইল নাম্বার" required icon={<Phone className="h-4 w-4" />}>
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="01XXXXXXXXX"
                />
              </Field>
              <Field label="বিকল্প মোবাইল নাম্বার" required icon={<Phone className="h-4 w-4" />}>
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="01XXXXXXXXX"
                />
              </Field>

              {/* Name */}
              <Field label="নাম" required icon={<User className="h-4 w-4" />}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="আপনার নাম"
                />
              </Field>

              {/* Email */}
              <Field label="ইমেইল" icon={<Mail className="h-4 w-4" />}>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="example@gmail.com"
                />
              </Field>

              {/* Shop Name */}
              <Field label="শপ বা ফেসবুক পেইজের নাম" icon={<Store className="h-4 w-4" />}>
                <input
                  name="shopName"
                  value={form.shopName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="আপনার শপের নাম"
                />
              </Field>

              {/* Shop Logo */}
              <Field label="Shop Logo" hint="(90px × 120px)" icon={<Upload className="h-4 w-4" />}>
                <div
                  className="flex border-secondary w-full cursor-pointer items-center gap-0 overflow-hidden rounded-xl border  transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20"
                  onClick={() => fileRef.current?.click()}
                >
                  <span className="flex shrink-0 items-center gap-1.5 border-r border-secondary px-3 py-2.5 text-xs font-medium ">
                    <Upload className="h-3.5 w-3.5" />
                    ফাইল বাছুন
                  </span>
                  <span className="truncate px-3 text-sm ">{fileName}</span>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />
              </Field>

              {/* Address */}
              <Field label="ঠিকানা" icon={<MapPin className="h-4 w-4" />}>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="আপনার ঠিকানা"
                />
              </Field>

              {/* New Password */}
              <Field label="নতুন পাসওয়ার্ড" icon={<Lock className="h-4 w-4" />}>
                <input
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="নতুন পাসওয়ার্ড লিখুন"
                />
              </Field>

              {/* Confirm Password */}
              <Field label="কনফার্ম পাসওয়ার্ড" icon={<Lock className="h-4 w-4" />}>
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="কনফার্ম পাসওয়ার্ড লিখুন"
                />
              </Field>
            </div>

            {/* Submit */}
            <div className="mt-6">
              {success && (
                <div className="mb-3 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-400">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  প্রোফাইল সফলভাবে আপডেট হয়েছে!
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
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