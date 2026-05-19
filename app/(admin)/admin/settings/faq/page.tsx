"use client";

import { useState } from "react";
import { Button, Input, Space, message } from "antd";
import type { ColumnsType } from "antd/es/table";

import {
  useGetFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "@/appstore/modules/(basic-routes)/faqs/api";
import { FaqForm } from "@/components/admin/settings/faqs/FaqForm";
import type { FaqFormData, FaqItem } from "@/lib/home";
import { ReusableTable } from "@/components/admin/common/ReusableTable";
import { AppModal } from "@/components/admin/common/AppModal";
import { DeleteConfirmModal } from "@/components/admin/common/DeleteConfirmModal";

export default function FaqPage() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [selected, setSelected] = useState<FaqItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);

  const { data, isLoading } = useGetFaqsQuery();
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  const faqs = data?.data || [];

  const filtered = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()),
  );

  const openModal = (type: typeof mode, item?: FaqItem) => {
    setMode(type);
    setSelected(item || null);
    setModalOpen(true);
  };

  const handleSubmit = async (values: FaqFormData) => {
    try {
      if (mode === "create") {
        await createFaq(values).unwrap();
        message.success("FAQ created successfully.");
      }

      if (mode === "edit" && selected) {
        await updateFaq({ id: selected.id, ...values }).unwrap();
        message.success("FAQ updated successfully.");
      }

      setModalOpen(false);
      setSelected(null);
      return { success: true };
    } catch (error) {
      const errorText =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to save faq. Please try again.";
      message.error(errorText);
      return { error };
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteFaq(deleteId).unwrap();
      setDeleteId(null);
      message.success("FAQ deleted successfully.");
    } catch (error) {
      message.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to delete faq. Please try again.",
      );
    }
  };

  const initialFormValues = selected
    ? {
        question: selected.question,
        answer: selected.answer,
        sort_order: selected.sort_order,
        status: selected.status,
      }
    : undefined;

  const columns: ColumnsType<FaqItem> = [
    {
      title: "SL",
      width: 80,
      align: "center",
      render: (_: unknown, __: FaqItem, index: number) => index + 1,
    },
    {
      title: "Question",
      dataIndex: "question",
      ellipsis: true,
    },
    {
      title: "Answer",
      dataIndex: "answer",
        width: 250,
      render: (value: string) => <span className="line-clamp-2">{value}</span>,
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
          <h2 className="text-xl font-semibold">FAQ</h2>
          <p className="text-sm text-gray-500">
            Manage FAQ items with create, edit, and delete actions.
          </p>
        </div>

        <button
          onClick={() => openModal("create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create FAQ
        </button>
      </div>

      <Input
        placeholder="Search FAQs..."
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
            ? "Create FAQ"
            : mode === "edit"
              ? "Edit FAQ"
              : "FAQ Details"
        }
      >
        {mode === "view" && selected ? (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Question</p>
              <p>{selected.question}</p>
            </div>
            <div>
              <p className="font-semibold">Answer</p>
              <p>{selected.answer}</p>
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
          <FaqForm initial={initialFormValues} onSubmit={handleSubmit} />
        )}
      </AppModal>

      <DeleteConfirmModal
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete FAQ"
        content="Are you sure you want to delete this FAQ? This action cannot be undone."
      />
    </div>
  );
}
