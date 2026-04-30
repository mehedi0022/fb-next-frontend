import { Metadata } from "next";
import Link from "next/link";
import ResetPasswordForm from "@/components/home/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "নতুন পাসওয়ার্ড সেট করুন - Freelancer Bangladesh",
  description: "আপনার নতুন পাসওয়ার্ড সেট করুন",
};

export default async function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = await params;

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 ">

      <div className="max-w-md w-full space-y-8">
        {/* ── Header ── */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-blue-600">
              Freelancer Bangladesh
            </h1>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            নতুন পাসওয়ার্ড সেট করুন
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            আপনার নতুন পাসওয়ার্ড নিচে দিন
          </p>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-100">
          <ResetPasswordForm token={token} />
        </div>

        {/* ── Footer Links ── */}
        <div className="text-center text-sm text-gray-600">
          <span>মনে পড়ে গেছে? </span>
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            লগইন করুন
          </Link>
          <span className="mx-2">•</span>
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            রেজিস্ট্রেশন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
