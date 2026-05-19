"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import type { FeatureFormData } from "@/lib/home";
import { Field } from "@/lib/home";

interface Props {
  initial?: Partial<FeatureFormData>; // When editing, populate the form with existing values
  onSubmit: (data: FeatureFormData) => Promise<unknown>; // Function provided by parent page
}

export const FeatureForm = ({ initial, onSubmit }: Props) => {
  // Initialize React Hook Form with default values.
  // If `initial` exists, use it for editing an item.
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FeatureFormData>({
    defaultValues: initial ?? {
      title: "",
      description: "",
      sort_order: 0,
      status: "active",
    },
  });

  // Loading state while submitting the form.
  const [loading, setLoading] = useState(false);

  // Server error state for display above the form.
  const [serverError, setServerError] = useState<string | null>(null);

  // Called when the user submits the form.
  const submitHandler = async (data: FeatureFormData) => {
    setLoading(true);
    setServerError(null);

    try {
      const res = await onSubmit(data);

      // If the parent returns a structured error object, show it.
      if (res && typeof res === "object" && "error" in res) {
        const serverMessage =
          (res as { error?: { data?: { message?: string } } }).error?.data
            ?.message || "Something went wrong";

        setServerError(serverMessage);
        setError("title", { message: serverMessage });
        return;
      }
    } catch (err) {
      // Catch unexpected exceptions and show a fallback message.
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
      {/* Show server errors from API responses */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      {/* Title and status are shown side by side on larger screens. */}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Title" required error={errors.title}>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 2, message: "Minimum 2 characters required" },
            })}
            className={`input ${errors.title ? "border-red-500" : ""}`}
            placeholder="Enter feature title"
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

      {/* Description field can be empty, but it is useful for display. */}
      <Field label="Description" error={errors.description}>
        <textarea
          {...register("description")}
          className="input h-28 resize-none"
          rows={4}
          placeholder="Enter feature description"
          disabled={loading}
        />
      </Field>

      {/* Sort order allows the admin to control display order on the frontend. */}
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

      {/* Submit button shows spinner while the request is in progress. */}
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
