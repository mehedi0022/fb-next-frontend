"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Package, Save } from "lucide-react";
import { PackageFormData } from "@/lib/admin/types";

interface PackageFormProps {
  onSubmit: (data: PackageFormData) => void;
  isSubmitting: boolean;
  defaultValues?: PackageFormData;
  submitLabel: string;
}

export function PackageForm({
  onSubmit,
  isSubmitting,
  defaultValues,
  submitLabel,
}: PackageFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PackageFormData>({
    defaultValues: defaultValues ?? {
      name: "",
      price: "",
      status: "active",
    },
  });

  // Edit mode এ নতুন data এলে form reset হবে
  useEffect(() => {
    reset(
      defaultValues ?? {
        name: "",
        price: "",
        status: "active",
      }
    );
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Package Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Package name *
        </label>

        <div className="relative">
          <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            type="text"
            {...register("name", {
              required: "নাম আবশ্যক",
              minLength: {
                value: 2,
                message: "কমপক্ষে 2 অক্ষর দিন",
              },
            })}
            className={`w-full pl-10 pr-3 py-2 text-sm border rounded-lg outline-none transition-all focus:ring-2 focus:ring-blue-200 ${
              errors.name ? "border-red-400" : "border-gray-200"
            }`}
            placeholder="e.g. Basic Package"
          />
        </div>

        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price (৳) *
        </label>

        <input
          type="number"
          {...register("price", {
            required: "Price আবশ্যক",
            min: {
              value: 1,
              message: "সঠিক price দিন",
            },
          })}
          className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all focus:ring-2 focus:ring-blue-200 ${
            errors.price ? "border-red-400" : "border-gray-200"
          }`}
          placeholder="14000"
        />

        {errors.price && (
          <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status *
        </label>

        <select
          {...register("status", {
            required: true,
          })}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? "সেভ হচ্ছে..." : submitLabel}
        </button>
      </div>
    </form>
  );
}