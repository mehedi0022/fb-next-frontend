"use client";

import Image from "next/image";
import { Upload } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { BannerFormData } from "@/lib/home/types";
import { Field } from "@/lib/home";

interface Props {
  initial?: Partial<BannerFormData> & { image_url?: string };
  loading?: boolean;
  onSubmit: (data: BannerFormData, imageFile?: File | null) => Promise<unknown>;
}

export const BannerForm = ({ initial, loading = false, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<BannerFormData>({
    defaultValues: {
      title: initial?.title ?? "",
      highlight_text: initial?.highlight_text ?? "",
      subtitle: initial?.subtitle ?? "",
      status: initial?.status ?? "active",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    reset({
      title: initial?.title ?? "",
      highlight_text: initial?.highlight_text ?? "",
      subtitle: initial?.subtitle ?? "",
      status: initial?.status ?? "active",
    });

    setImageFile(null);

    if (initial?.image_url) {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(
        /\/api\/v\d+$/i,
        "",
      );

      setFileList([
        {
          uid: "-1",
          name: "banner-image",
          status: "done",
          url: `${apiBaseUrl}/${initial.image_url}` || "/assets/Banner.png",
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [initial, reset]);

  const submitHandler = async (data: BannerFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const result = await onSubmit(data, imageFile);

      if (result && typeof result === "object" && "error" in result) {
        const serverMessage =
          (result as { error?: { data?: { message?: string } } }).error?.data
            ?.message || "Something went wrong";

        setServerError(serverMessage);
        setError("title", { message: serverMessage });
        return;
      }
    } catch (err) {
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        "Server error, please try again.";
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBeforeUpload = (file: RcFile) => {
    const previewUrl = URL.createObjectURL(file);
    const uploadFile: UploadFile = {
      uid: file.uid ?? `-${Date.now()}`,
      name: file.name,
      status: "done",
      url: previewUrl,
      originFileObj: file,
    };

    setFileList([uploadFile]);
    setImageFile(file);
    return false;
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    setImageFile(null);
    return true;
  };

  const handlePreview = async (file: UploadFile) => {
    const src =
      file.url ??
      (file.originFileObj ? URL.createObjectURL(file.originFileObj) : "");

    if (src) {
      window.open(src, "_blank");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="grid gap-6 lg:grid-cols-[1.7fr_1.1fr]"
    >
      {serverError && (
        <div className="lg:col-span-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <div className="space-y-5">
        <Field label="Banner Title" required error={errors.title}>
          <input
            type="text"
            {...register("title", {
              required: "Banner title is required",
            })}
            className={`input ${errors.title ? "border-red-500" : ""}`}
            placeholder="Enter banner title"
            disabled={loading}
          />
        </Field>

        <Field label="Highlight Text" required error={errors.highlight_text}>
          <input
            type="text"
            {...register("highlight_text", {
              required: "Highlight text is required",
            })}
            className={`input ${errors.highlight_text ? "border-red-500" : ""}`}
            placeholder="Enter highlight text"
            disabled={loading}
          />
        </Field>

        <Field label="Subtitle" required error={errors.subtitle}>
          <textarea
            {...register("subtitle", {
              required: "Subtitle is required",
            })}
            className={`input h-28 resize-none ${errors.subtitle ? "border-red-500" : ""}`}
            placeholder="Enter banner subtitle"
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

      <div className="space-y-5">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-slate-900">Banner Image</p>
            <p className="text-sm text-gray-500">
              Upload your banner image and preview it for a responsive display.
            </p>
          </div>

          <div className="mt-5">
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={handleBeforeUpload}
              onPreview={handlePreview}
              onRemove={handleRemove}
              accept="image/*"
              maxCount={1}
              disabled={loading}
            >
              {fileList.length >= 1 ? null : (
                <div className="flex flex-col items-center gap-2 text-slate-600">
                  <span className="text-2xl">+</span>
                  <span>Select</span>
                </div>
              )}
            </Upload>
          </div>

          <div className="mt-6 rounded-3xl border border-gray-200 bg-slate-50 p-4">
            <p className="mb-3 text-sm font-medium text-gray-700">
              Live preview
            </p>
            {fileList[0]?.url ? (
              <div className="relative h-72 overflow-hidden rounded-2xl bg-white">
                <Image
                  src={fileList[0].url as string}
                  alt="Banner preview"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-4 text-center text-sm text-gray-500">
                Upload an image to see a responsive preview.
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || isSubmitting}
        className={`lg:col-span-2 w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 ${
          loading || isSubmitting ? "cursor-not-allowed bg-gray-400" : ""
        }`}
      >
        {loading || isSubmitting ? "Saving..." : "Save Banner"}
      </button>
    </form>
  );
};
