"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FieldError, useForm } from "react-hook-form";
import { Field } from "@/lib/home";
import {
  Phone,
  User,
  AlertCircle,
  Save,
  Mail,
  StoreIcon,
  Globe,
  MapPin,
  Building2,
  Building,
  Users,
  ImageIcon,
} from "lucide-react";
import {
  useGetSellerByidQuery,
  useUpdateSellerMutation,
} from "@/appstore/modules/seller/api";
import { useGetBranchesQuery } from "@/appstore/modules/branch/api";
import { toast } from "react-toastify";
import LoadingSkeleton from "@/components/admin/common/Skeleton";
import { BatchInBranch } from "@/lib/home";
import Image from "next/image";

// ==================== TYPES ====================
interface SellerFormData {
  phone: string;
  name: string;
  email: string;
  shopName: string;
  address: string;
  district: string;
  domain: string;
  status: string;
  branchId: string;
  batchId: string;
  agreeToTerms: boolean;
  shopLogo: FileList | null;
}

interface SellerData {
  phone?: string;
  name?: string;
  email?: string;
  page_name?: string;
  shopName?: string;
  address?: string;
  district?: string;
  domain_name?: string;
  status: string;
  shopLogo?: string;
  batch?: {
    id?: number;
    batchName?: string;
    branch?: {
      id: number;
      branchName?: string;
    };
  };
}

interface SellerResponse {
  data?: SellerData;
}

interface BranchItem {
  id: number;
  branchName: string;
  status: string;
  batches?: BatchInBranch[];
}

interface BranchesResponse {
  branches: BranchItem[];
}

interface UpdateSellerResponse {
  success: boolean;
  message?: string;
}

// ==================== CONSTANTS ====================
const PHONE_PATTERN = /^(\+88)?01[3-9]\d{8}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMAIN_PATTERN =
  /^(?:https?:\/\/)?(?:www\.)?([\da-z.-]+)\.([a-z.]{2,})([\/\w .-]*)*\/?$/i;

// ==================== PROPS ====================
type Props = {
  params: {
    id: number;
  };
};

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

  const { data: branches, isError: branchesError } = useGetBranchesQuery() as {
    data?: BranchesResponse;
    isError: boolean;
  };

  const [updateSeller] = useUpdateSellerMutation();

  // ── Form ─────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm<SellerFormData>({
    defaultValues: {
      phone: "",
      name: "",
      email: "",
      shopName: "",
      address: "",
      district: "",
      domain: "",
      status: "",
      branchId: "",
      batchId: "",
      agreeToTerms: true,
      shopLogo: null,
    },
  });

  // ── Local state ───────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>("");

  // ── Branch → Batch map ────────────────────────────────────
  const branchMap = useMemo(() => {
    if (!branches?.branches) return new Map<number, BranchItem>();
    return new Map<number, BranchItem>(branches.branches.map((b) => [b.id, b]));
  }, [branches]);

  const selectedBranchId = watch("branchId");
  const selectedBranch = branchMap.get(Number(selectedBranchId));

  // ── API Data → Auto Fill ──────────────────────────────────
  useEffect(() => {
    if (!data?.data) return;

    const seller = data.data;

    reset({
      phone: seller.phone ?? "",
      name: seller.name ?? "",
      email: seller.email ?? "",
      shopName: seller.page_name ?? seller.shopName ?? "",
      address: seller.address ?? "",
      district: seller.district ?? "",
      domain: seller.domain_name ?? "",
      status: seller.status ?? "",
      branchId: seller.batch?.branch?.id ? String(seller.batch.branch.id) : "",
      batchId: seller.batch?.id ? String(seller.batch.id) : "",
      shopLogo: null,
    });

    if (seller.shopLogo) {
      setLogoPreview(seller.shopLogo);
    }
  }, [data, reset]);

  // ── Submit ────────────────────────────────────────────────
  const onSubmit = async (formData: SellerFormData) => {
    setIsLoading(true);

    try {
      const payload = new FormData();
      payload.append("phone", formData.phone);
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("page_name", formData.shopName);
      payload.append("address", formData.address ?? "");
      payload.append("district", formData.district ?? "");
      payload.append("domain", formData.domain ?? "");
      payload.append("status", formData.status);
      payload.append("branchId", formData.branchId);
      payload.append("batchId", formData.batchId);

      if (formData.shopLogo?.[0]) {
        payload.append("shopLogo", formData.shopLogo[0]);
      }

      const [sellerResult] = await Promise.all([
        updateSeller({ id, body: payload }),
      ]);

      const sellerSuccess =
        "data" in sellerResult &&
        (sellerResult.data as UpdateSellerResponse)?.success;

      if (sellerSuccess) {
        toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
        router.push("/admin/students/pending");
        return;
      }

      const apiError =
        "error" in sellerResult
          ? (sellerResult.error as { data?: { message?: string } })
          : null;

      toast.error(apiError?.data?.message ?? "Seller আপডেটে সমস্যা হয়েছে।");
      setError("agreeToTerms", {
        type: "manual",
        message: "আপডেটে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    } catch {
      toast.error("আপডেটে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setError("agreeToTerms", {
        type: "manual",
        message: "আপডেটে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ── Guards ────────────────────────────────────────────────
  if (isFetching) return <LoadingSkeleton />;

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error fetching seller data.
      </div>
    );
  }

  if (!data?.data) {
    return <div className="text-center py-10">No seller found</div>;
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* General Error */}
      {errors.agreeToTerms && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errors.agreeToTerms.message}</span>
        </div>
      )}

      <h2 className="text-xl font-semibold">Edit Seller</h2>

      <div className="grid md:grid-cols-3 gap-6">
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
            <StoreIcon className="input-icon" />
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
        <Field label="ঠিকানা" error={errors.address}>
          <div className="relative">
            <MapPin className="input-icon" />
            <input
              type="text"
              {...register("address")}
              className={`input !pl-10 ${errors.address ? "border-red-500" : ""}`}
              placeholder="বাড়ি, রোড, এলাকা"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* District */}
        <Field label="জেলা" error={errors.district}>
          <div className="relative">
            <Building2 className="input-icon" />
            <input
              type="text"
              {...register("district")}
              className={`input !pl-10 ${errors.district ? "border-red-500" : ""}`}
              placeholder="জেলার নাম"
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

        {/* Status */}
        <Field label="স্ট্যাটাস *" error={errors.status}>
          <div className="relative">
            <Building className="input-icon" />
            <select
              {...register("status", { required: "স্ট্যাটাস নির্বাচন করুন" })}
              className={`input !pl-10 ${errors.status ? "border-red-500" : ""}`}
              disabled={isLoading}>
              <option value="">স্ট্যাটাস নির্বাচন করুন</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </Field>

        {/* Branch */}
        <Field
          label="ব্রাঞ্চ নির্বাচন *"
          error={
            errors.branchId ??
            (branchesError
              ? { message: "ব্রাঞ্চ লোড করতে সমস্যা হয়েছে" }
              : undefined)
          }>
          <div className="relative">
            <Building className="input-icon" />
            <select
              {...register("branchId", { required: "ব্রাঞ্চ নির্বাচন করুন" })}
              className={`input !pl-10 ${errors.branchId || branchesError ? "border-red-500" : ""}`}
              disabled={isLoading || branchesError}>
              <option value="">ব্রাঞ্চ নির্বাচন করুন</option>
              {branches?.branches
                ?.filter((branch) => branch.status === "active")
                .map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branchName}
                  </option>
                ))}
            </select>
          </div>
        </Field>

        {/* Batch */}
        <Field label="ব্যাচ নির্বাচন *" error={errors.batchId}>
          <div className="relative">
            <Users className="input-icon" />
            <select
              {...register("batchId", { required: "ব্যাচ নির্বাচন করুন" })}
              className={`input !pl-10 ${errors.batchId ? "border-red-500" : ""}`}
              disabled={isLoading || !selectedBranchId}>
              <option value="">ব্যাচ নির্বাচন করুন</option>

              {!selectedBranch && (
                <option value="" disabled>
                  প্রথমে ব্রাঞ্চ নির্বাচন করুন
                </option>
              )}

              {selectedBranch?.batches
                ?.filter((batch: BatchInBranch) => batch.status === "active")
                .map((batch: BatchInBranch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.batchName}
                  </option>
                ))}
            </select>
          </div>
        </Field>

        {/* Shop Logo */}
        <Field label="শপ লোগো" error={errors.shopLogo as unknown as FieldError}>
          <div className="space-y-2">
            {logoPreview && (
              <div className="flex items-center gap-3">
                <Image
                  src={logoPreview}
                  alt="Current shop logo"
                  width={64}
                  height={64}
                  className="object-cover rounded-lg border border-gray-200"
                />
                <span className="text-sm text-gray-500">বর্তমান লোগো</span>
              </div>
            )}
            <div className="relative">
              <ImageIcon className="input-icon" />
              <input
                type="file"
                accept="image/*"
                {...register("shopLogo")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setLogoPreview(URL.createObjectURL(file));
                }}
                className={`input !pl-10 ${errors.shopLogo ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-gray-400">
              JPG, PNG, WEBP — সর্বোচ্চ ২ MB
            </p>
          </div>
        </Field>
      </div>

      {/* Submit */}
      <div className="pt-4 container mx-auto">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-semibold transition-all ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}>
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
