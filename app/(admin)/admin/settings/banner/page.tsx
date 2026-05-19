"use client";

import { useMemo } from "react";
import { message } from "antd";
import {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
} from "@/appstore/modules/(basic-routes)/banner/api";
import type { BannerFormData, BannerItem } from "@/lib/home/types";
import { BannerForm } from "@/components/admin/settings/banner/BannerForm";

export default function BannerPage() {
  const { data, isLoading } = useGetBannersQuery();
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();

  const banner = useMemo<BannerItem | undefined>(() => {
    return data?.data?.[0];
  }, [data]);

  const initialValues:
    | (Partial<BannerFormData> & { image_url?: string })
    | undefined = banner
    ? {
        title: banner.title,
        highlight_text: banner.highlight_text,
        subtitle: banner.subtitle,
        status: banner.status,
        image_url: banner.image,
      }
    : undefined;

  const handleSubmit = async (
    values: BannerFormData,
    imageFile?: File | null,
  ) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("highlight_text", values.highlight_text);
    formData.append("subtitle", values.subtitle);
    formData.append("status", values.status);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (banner?.id) {
        await updateBanner({ id: banner.id, body: formData }).unwrap();
        message.success("Banner updated successfully.");
      } else {
        await createBanner(formData).unwrap();
        message.success("Banner created successfully.");
      }
    } catch (error) {
      const errorText =
        (error as { data?: { message?: string } })?.data?.message ||
        "Unable to save banner. Please try again.";
      message.error(errorText);
      return { error };
    }

    return { success: true };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Banner Settings</h1>
        <p className="text-sm text-gray-500">
          Add or update the default banner content for the home page.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <BannerForm
          initial={initialValues}
          loading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
