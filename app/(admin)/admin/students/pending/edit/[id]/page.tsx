"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Field } from "@/lib/home";
import { Phone, User, AlertCircle, Save, Mail, StoreIcon, Globe } from "lucide-react";
import {
  useGetSellerByidQuery,
  useUpdateSellerMutation,
} from "@/appstore/modules/seller/api";
import { toast } from "react-toastify";
import LoadingSkeleton from "@/components/admin/common/Skeleton";

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

interface SellerData {
  phone?: string;
  name?: string;
  email?: string;
  shopName?: string;
  shop_name?: string;
  address?: string;
  district?: string;
  domain?: string;
  domain_name?: string;
  branchId?: number;
  batchId?: number;
}

interface SellerResponse {
  data?: SellerData;
}

// ==================== CONSTANTS ====================
const PHONE_PATTERN = /^(\+88)?01[3-9]\d{8}$/;

// ==================== PROPS ====================
type Props = {
  params: {
    id: number;
  };
};

// Validation 
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMAIN_PATTERN =
  /^(?:https?:\/\/)?(?:www\.)?([\da-z.-]+)\.([a-z.]{2,})([\/\w .-]*)*\/?$/i;

// ==================== COMPONENT ====================
export default function EditSellerForm({ params }: Props) {
  const { id } = params;
  const router = useRouter();

  // ── Queries ──────────────────────────────────────────────
  const {
    data,
    isLoading: isFetching,
    isError,
  } = useGetSellerByidQuery(id) as {
    data?: SellerResponse;
    isLoading: boolean;
    isError: boolean;
  };

  const [updateSeller] = useUpdateSellerMutation();

  // ── Form ─────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phone: "",
      name: "",
      email: "",
      shopName: "",
      address: "",
      district: "",
      domain: "",
      branchId: "",
      batchId: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: true,
    },
  });

  // ── Local state ───────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(false);

  // ── API Data → Auto Fill ────────────────────────────────
  useEffect(() => {
    if (!data?.data) return;

    const seller = data.data;

    reset({
      phone: seller.phone ?? "",
      name: seller.name ?? "",
      email: seller.email ?? "",
      shopName: seller.shopName ?? seller.shop_name ?? "",
      address: seller.address ?? "",
      district: seller.district ?? "",
      domain: seller.domain_name ?? seller.domain ?? "",
      branchId: seller.branchId ? String(seller.branchId) : "",
      batchId: seller.batchId ? String(seller.batchId) : "",
      password: "",
      confirmPassword: "",
      agreeToTerms: true,
    });
  }, [data, reset]);

  // ── Submit ────────────────────────────────────────────────
  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const payload = {
        id,
        phone: formData.phone,
        name: formData.name,
        email: formData.email,
        shopName: formData.shopName,
        address: formData.address,
        district: formData.district,
        domain: formData.domain,
        branchId: formData.branchId ? Number(formData.branchId) : null,
        batchId: formData.batchId ? Number(formData.batchId) : null,
        ...(formData.password
          ? { password: formData.password }
          : {}),
      };

      const result = await updateSeller(payload);

      if ("data" in result && result.data?.success) {
        toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
        router.push("/admin/sellers");
        return;
      }

      let errorMessage =
        "আপডেটে সমস্যা হয়েছে। আবার চেষ্টা করুন।";

      if ("error" in result) {
        const apiError = result.error as {
          data?: {
            message?: string;
          };
        };

        errorMessage =
          apiError?.data?.message ?? errorMessage;
      }

      toast.error(errorMessage);

      setError("agreeToTerms", {
        type: "manual",
        message: errorMessage,
      });
    } catch {
      const message =
        "আপডেটে সমস্যা হয়েছে। আবার চেষ্টা করুন।";

      toast.error(message);

      setError("agreeToTerms", {
        type: "manual",
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ── Guards ────────────────────────────────────────────────
  if (isFetching) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error fetching seller data.
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="text-center py-10">
        No seller found
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* General Error */}
      {errors.agreeToTerms && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errors.agreeToTerms.message}</span>
        </div>
      )}
      <h2>Edit Student</h2>

      {/* Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Phone */}
        <Field
          label="মোবাইল নাম্বার *"
          error={errors.phone}
        >
          <div className="relative">
            <Phone className="input-icon" />
            <input
              type="tel"
              {...register("phone", {
                required: "মোবাইল নাম্বার আবশ্যক",
                pattern: {
                  value: PHONE_PATTERN,
                  message:
                    "সঠিক বাংলাদেশী মোবাইল নাম্বার দিন",
                },
              })}
              className={`input !pl-10 ${errors.phone
                  ? "border-red-500"
                  : ""
                }`}
              placeholder="01XXXXXXXXX"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* Name */}
        <Field
          label="পূর্ণ নাম *"
          error={errors.name}
        >
          <div className="relative">
            <User className="input-icon" />
            <input
              type="text"
              {...register("name", {
                required: "নাম আবশ্যক",
                minLength: {
                  value: 2,
                  message:
                    "নাম কমপক্ষে ২ অক্ষরের হতে হবে",
                },
              })}
              className={`input !pl-10 ${errors.name
                  ? "border-red-500"
                  : ""
                }`}
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

      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-semibold transition-all ${isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              আপডেট হচ্ছে...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              আপডেট করুন
            </>
          )}
        </button>
      </div>
    </form>
  );
}