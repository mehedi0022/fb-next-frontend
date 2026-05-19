"use client";

import { useState } from "react";
import { Button, Input, Space, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { StepItem } from "@/lib/home";

import {
  useGetStepsQuery,
  useCreateStepsMutation,
  useUpdateStepsMutation,
  useDeleteStepsMutation,
} from "@/appstore/modules/(basic-routes)/steps/api";
import { StepForm } from "@/components/admin/settings/steps/StepForm";
import type { StepFormData } from "@/lib/home";
import { ReusableTable } from "@/components/admin/common/ReusableTable";
import { AppModal } from "@/components/admin/common/AppModal";
import { DeleteConfirmModal } from "@/components/admin/common/DeleteConfirmModal";

export default function StepsPage() {
  // Page state for search, modal mode, selected item, and delete confirmation.
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [selected, setSelected] = useState<StepItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading } = useGetStepsQuery();
  const [createStep] = useCreateStepsMutation();
  const [updateStep] = useUpdateStepsMutation();
  const [deleteStep] = useDeleteStepsMutation();

  // Steps list loaded from the API.
  const steps = data?.data || [];

  const filtered = steps.filter((step) =>
    step.description.toLowerCase().includes(search.toLowerCase()),
  );

  const openModal = (type: typeof mode, item?: StepItem) => {
    setMode(type);
    setSelected(item || null);
    setModalOpen(true);
  };

  // Handle form submit for creating or updating a step.
  const handleSubmit = async (values: StepFormData) => {
    try {
      if (mode === "create") {
        await createStep(values).unwrap();
        message.success("Step created successfully.");
      }

      if (mode === "edit" && selected) {
        await updateStep({ id: selected.id, ...values }).unwrap();
        message.success("Step updated successfully.");
      }

      setModalOpen(false);
      setSelected(null);
      return { success: true };
    } catch (error) {
      const errorText =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to save step. Please try again.";
      message.error(errorText);
      return { error };
    }
  };

  // Handle deleting a selected step.
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteStep(deleteId).unwrap();
      setDeleteId(null);
      message.success("Step deleted successfully.");
    } catch (error) {
      message.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to delete step. Please try again.",
      );
    }
  };

  const initialFormValues = selected
    ? {
        description: selected.description,
        sort_order: selected.sort_order,
        status: selected.status,
      }
    : undefined;

  // Table columns configuration for steps.
  const columns: ColumnsType<StepItem> = [
    {
      title: "SL",
      width: 80,
      align: "center",
      render: (_: unknown, __: StepItem, index: number) => index + 1,
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
      width: 200,
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
          <h2 className="text-xl font-semibold">Steps</h2>
          <p className="text-sm text-gray-500">
            Manage about page steps with create, edit, and delete actions.
          </p>
        </div>

        <button
          onClick={() => openModal("create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Step
        </button>
      </div>

      <Input
        placeholder="Search steps..."
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
            ? "Create Step"
            : mode === "edit"
              ? "Edit Step"
              : "Step Details"
        }
      >
        {mode === "view" && selected ? (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Description</p>
              <p>{selected.description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="font-semibold">Sort Order</p>
                <p>{selected.sort_order}</p>
              </div>
              <div>
                <p className="font-semibold">Created Date</p>
                <p>
                  {new Date(selected.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <p>{selected.status}</p>
            </div>
          </div>
        ) : (
          <StepForm initial={initialFormValues} onSubmit={handleSubmit} />
        )}
      </AppModal>

      <DeleteConfirmModal
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Step"
        content="Are you sure you want to delete this step? This action cannot be undone."
      />
    </div>
  );
}
