"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import { Field, StepFormData } from "@/lib/home";

interface Props {
  initial?: Partial<StepFormData>;
  onSubmit: (data: StepFormData) => Promise<unknown>;
}

export const StepForm = ({ initial, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<StepFormData>({
    defaultValues: initial ?? {
      description: "",
      sort_order: 0,
      status: "active",
    },
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const submitHandler = async (data: StepFormData) => {
    setLoading(true);
    setServerError(null);

    try {
      const res = await onSubmit(data);

      if (res && typeof res === "object" && "error" in res) {
        const serverMessage =
          (res as { error?: { data?: { message?: string } } }).error?.data
            ?.message || "Something went wrong";

        setServerError(serverMessage);
        setError("description", { message: serverMessage });
        return;
      }
    } catch (err) {
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        "Server error, please try again.";
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      <Field label="Description" required error={errors.description}>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 5,
              message: "Please add a longer description",
            },
          })}
          className={`input h-28 resize-none ${errors.description ? "border-red-500" : ""}`}
          placeholder="Enter step description"
          disabled={loading}
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Sort Order" error={errors.sort_order}>
          <input
            type="number"
            {...register("sort_order", {
              valueAsNumber: true,
              min: { value: 0, message: "Sort order must be 0 or higher" },
            })}
            className={`input ${errors.sort_order ? "border-red-500" : ""}`}
            placeholder="0"
            disabled={loading}
          />
        </Field>

        <Field label="Status" required error={errors.status}>
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
        </Field>
      </div>

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
    </form>
  );
};
