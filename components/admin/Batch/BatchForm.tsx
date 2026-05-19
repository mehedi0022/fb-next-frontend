"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { BatchFormData, Field } from "@/lib/home";
import { AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  branches: { id: number; branchName: string }[];
  initial?: Partial<BatchFormData>;
  onSubmit: (data: BatchFormData) => Promise<unknown>;
}

export const BatchForm = ({ branches, initial, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<BatchFormData>({
    defaultValues: initial,
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const submitHandler = async (data: BatchFormData) => {
    setLoading(true);
    setServerError(null);

    try {
      const res = await onSubmit({
        ...data,
        branchId: Number(data.branchId),
        maxStudents: Number(data.maxStudents),
      });

      if (res && typeof res === "object" && "error" in res) {
        const message =
          (res as { error?: { data?: { message?: string } } }).error?.data
            ?.message || "Something went wrong";

        setServerError(message);

        // optional field error
        setError("batchName", { message });
        return;
      }
    } catch (err) {
      setServerError("Server error");
      toast.error((err as string) || "Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      {serverError && (
        <div className="bg-red-50 text-red-600 p-3 rounded flex gap-2">
          <AlertCircle size={16} />
          {serverError}
        </div>
      )}

      <Field label="Batch Name" error={errors.batchName} required>
        <input
          {...register("batchName", { required: true })}
          className="input"
          disabled={loading}
        />
      </Field>

      <Field label="Branch" error={errors.branchId} required>
        <select
          {...register("branchId", { required: true })}
          className="input"
          disabled={loading}
        >
          <option value="">Select Branch</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.branchName}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Max Students" error={errors.maxStudents} required>
        <input
          type="number"
          defaultValue={100}
          {...register("maxStudents", { required: true })}
          className="input"
          disabled={loading}
        />
      </Field>

      <Field label="Status" error={errors.status}>
        <select {...register("status")} className="input" disabled={loading}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </Field>

      {/* <button
        className="btn-primary w-full flex items-center justify-center gap-2"
        disabled={loading}
      >
        <CheckCircle size={16} />
        Submit
      </button> */}
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
