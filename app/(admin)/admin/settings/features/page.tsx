"use client";

import { useState } from "react";
import { Button, Input, message, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { FeatureItem } from "@/lib/home";

import {
  useGetFeaturesQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} from "@/appstore/modules/(basic-routes)/features/api";
import { FeatureForm } from "@/components/admin/settings/features/FeatureForm";
import type { FeatureFormData } from "@/lib/home";
import { ReusableTable } from "@/components/admin/common/ReusableTable";
import { AppModal } from "@/components/admin/common/AppModal";
import { DeleteConfirmModal } from "@/components/admin/common/DeleteConfirmModal";

export default function FeaturesPage() {
  // Page state for search, modal mode, selected item, and delete confirmation.
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [selected, setSelected] = useState<FeatureItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading } = useGetFeaturesQuery();
  const [createFeature] = useCreateFeatureMutation();
  const [updateFeature] = useUpdateFeatureMutation();
  const [deleteFeature] = useDeleteFeatureMutation();

  // Features list loaded from the API.
  const features = data?.data || [];

  const filtered = features.filter((feature) =>
    feature.title.toLowerCase().includes(search.toLowerCase()),
  );

  const openModal = (type: typeof mode, item?: FeatureItem) => {
    setMode(type);
    setSelected(item || null);
    setModalOpen(true);
  };

  // Handle form submit for creating or updating a feature.
  const handleSubmit = async (values: FeatureFormData) => {
    try {
      if (mode === "create") {
        await createFeature(values).unwrap();
        message.success("Feature created successfully.");
      }

      if (mode === "edit" && selected) {
        await updateFeature({ id: selected.id, ...values }).unwrap();
        message.success("Feature updated successfully.");
      }

      setModalOpen(false);
      setSelected(null);
      return { success: true };
    } catch (error) {
      const errorText =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to save feature. Please try again.";
      message.error(errorText);
      return { error };
    }
  };

  // Handle deleting a selected feature.
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteFeature(deleteId).unwrap();
      setDeleteId(null);
      message.success("Feature deleted successfully.");
    } catch (error) {
      message.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to delete feature. Please try again.",
      );
    }
  };

  const initialFormValues = selected
    ? {
        title: selected.title,
        description: selected.description,
        sort_order: selected.sort_order,
        status: selected.status,
      }
    : undefined;

  // Table columns configuration for features.
  const columns: ColumnsType<FeatureItem> = [
    {
      title: "SL",
      width: 80,
      align: "center",
      render: (_: unknown, __: FeatureItem, index: number) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      ellipsis: true,
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Order",
      dataIndex: "sort_order",
      width: 100,
      align: "center",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      width: 180,
      align: "center",
      ellipsis: true,
      render: (value: string) =>
        new Date(value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      align: "center",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      align: "center",
      width: 180,
      render: (_, item) => (
        <Space>
          <Button size="small" onClick={() => openModal("view", item)}>
            View
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => openModal("edit", item)}
          >
            Edit
          </Button>
          <Button danger size="small" onClick={() => setDeleteId(item.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Features</h2>
          <p className="text-sm text-gray-500">
            Manage home page feature cards with create, edit, and delete
            actions.
          </p>
        </div>

        <button
          onClick={() => openModal("create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Feature
        </button>
      </div>

      <Input
        placeholder="Search features..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md"
      />

      <ReusableTable columns={columns} data={filtered} loading={isLoading} />

      <AppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          mode === "create"
            ? "Create Feature"
            : mode === "edit"
              ? "Edit Feature"
              : "Feature Details"
        }
      >
        {mode === "view" && selected ? (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Title</p>
              <p>{selected.title}</p>
            </div>
            <div>
              <p className="font-semibold">Description</p>
              <p>{selected.description || "No description provided."}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="font-semibold">Sort Order</p>
                <p>{selected.sort_order}</p>
              </div>
              <div>
                <p className="font-semibold">Status</p>
                <p>{selected.status}</p>
              </div>
            </div>
          </div>
        ) : (
          <FeatureForm initial={initialFormValues} onSubmit={handleSubmit} />
        )}
      </AppModal>

      <DeleteConfirmModal
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Feature"
        content="Are you sure you want to delete this feature? This action cannot be undone."
      />
    </div>
  );
}
