"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { BranchFormData, Field } from "@/lib/home";
import { Building2, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  initial?: Partial<BranchFormData>;
  onSubmit: (data: BranchFormData) => Promise<unknown>;
}

export const CustomBranchForm = ({ initial, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<BranchFormData>({
    defaultValues: initial,
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const submitHandler = async (data: BranchFormData) => {
    setLoading(true);
    setServerError(null);

    try {
      const res = await onSubmit(data);

      // 🔴 backend error handling
      if (res && typeof res === "object" && "error" in res) {
        const message =
          (res as { error?: { data?: { message?: string } } }).error?.data
            ?.message || "Something went wrong";

        setServerError(message);

        // optional field error
        setError("branchName", { message });
        return;
      }
    } catch (err) {
      setServerError("Server error, please try again.");
      toast.error((err as string) || "Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* 🔴 GLOBAL ERROR (modal-এর ভিতরে show হবে) */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {serverError}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {/* Branch Name */}
        <Field label="Branch Name *" error={errors.branchName}>
          <div className="relative">
            <Building2 className="input-icon" />
            <input
              type="text"
              {...register("branchName", {
                required: "Branch name is required",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters required",
                },
              })}
              className={`input !pl-10 ${
                errors.branchName ? "border-red-500" : ""
              }`}
              placeholder="Enter branch name"
              disabled={loading}
            />
          </div>
        </Field>

        {/* Status */}
        <Field label="Status *" error={errors.status}>
          <div className="relative">
            <select
              {...register("status", {
                required: "Status is required",
              })}
              className={`input ${errors.status ? "border-red-500" : ""}`}
              disabled={loading}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </Field>

        {/* Description */}
        <div className="md:col-span-2">
          <Field label="Description" error={errors.branchDescription}>
            <div className="relative">
              <FileText className="input-icon" />
              <textarea
                {...register("branchDescription")}
                className={`input !pl-10 ${
                  errors.branchDescription ? "border-red-500" : ""
                }`}
                rows={3}
                placeholder="Write description..."
                disabled={loading}
              />
            </div>
          </Field>
        </div>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Submit
            </>
          )}
        </button>
      </div>
    </form>
  );
};
