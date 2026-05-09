"use client";

import { useState } from "react";
import { Button, Input, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useGetBranchesQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} from "@/appstore/modules/branch/api";

import { ReusableTable } from "../common/ReusableTable";
import { CustomBranchForm } from "./CustomBranchForm";
import { AppModal } from "../common/AppModal";
import { DeleteConfirmModal } from "../common/DeleteConfirmModal";
import { BatchInBranch, Branch, BranchFormData } from "@/lib/home";
import { toast } from "react-toastify";

export default function BranchPage() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [selected, setSelected] = useState<Branch | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const initialFormValues = selected
    ? {
        branchName: selected.branchName,
        branchDescription: selected.branchDescription,
        status: selected.status,
      }
    : undefined;

  const { data, isLoading } = useGetBranchesQuery();
  const [createBranch] = useCreateBranchMutation();
  const [updateBranch] = useUpdateBranchMutation();
  const [deleteBranch] = useDeleteBranchMutation();

  const branches = data?.branches || [];

  const filtered = branches.filter((b) =>
    b.branchName.toLowerCase().includes(search.toLowerCase()),
  );

  const openModal = (type: typeof mode, item?: Branch) => {
    setMode(type);
    setSelected(item || null);
    setModalOpen(true);
  };

  const handleSubmit = async (values: BranchFormData) => {
    try {
      if (mode === "create") {
        await createBranch(values).unwrap();
      }

      if (mode === "edit" && selected) {
        await updateBranch({
          id: selected.id,
          ...values,
        }).unwrap();
      }

      setModalOpen(false);
      setSelected(null);

      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const handleDelete = async () => {
    try {
      if (!deleteId) return;
      await deleteBranch(deleteId).unwrap();
      setDeleteId(null);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(
        (err as { code: string }).code ||
          "Failed to delete branch. Please try again.",
      );
    }
  };

  const columns: ColumnsType<Branch> = [
    {
      title: "SL",
      width: 80,
      align: "center",
      render: (_: unknown, __: Branch, index: number) => index + 1,
    },
    {
      title: "Branch",
      dataIndex: "branchName",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center" as const,
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
      title: "Batches",
      align: "center" as const,
      render: (_, r) => r.batches?.length || 0,
    },
    {
      title: "Actions",
      align: "center" as const,
      render: (_, r) => (
        <Space>
          <Button size="small" onClick={() => openModal("view", r)} icon>
            View
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => openModal("edit", r)}
          >
            Edit
          </Button>
          <Button danger size="small" onClick={() => setDeleteId(r.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Branches</h2>

        <button
          onClick={() => openModal("create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create
        </button>
      </div>

      {/* search */}
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-72"
      />

      {/* table */}
      <ReusableTable columns={columns} data={filtered} loading={isLoading} />

      {/* GLOBAL MODAL */}
      <AppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          mode === "create"
            ? "Create Branch"
            : mode === "edit"
              ? "Edit Branch"
              : "Branch Details"
        }
      >
        {/* 🔥 CUSTOM CONTENT INJECTION */}

        {mode === "view" && (
          <div className="space-y-3">
            <p>
              <b>Name:</b> {selected?.branchName}
            </p>
            <p>
              <b>Description:</b> {selected?.branchDescription}
            </p>

            <div>
              <p className="font-medium mb-1">Batches:</p>
              <div className="grid grid-cols-2 gap-2">
                {selected?.batches?.map((b: BatchInBranch) => (
                  <div key={b.id} className="border p-2 rounded">
                    {b.batchName || b.id}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(mode === "create" || mode === "edit") && (
          <CustomBranchForm
            initial={initialFormValues}
            onSubmit={handleSubmit}
          />
        )}
      </AppModal>

      {/* DELETE CONFIRMATION */}
      <DeleteConfirmModal
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Confirmation Delete"
        content="Are you sure you want to delete this branch? This action cannot be undone."
      />
    </div>
  );
}
