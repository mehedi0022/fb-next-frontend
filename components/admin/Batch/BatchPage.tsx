"use client";

import { useState } from "react";
import { Button, Input, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

import { ReusableTable } from "../common/ReusableTable";
import { AppModal } from "../common/AppModal";
import { DeleteConfirmModal } from "../common/DeleteConfirmModal";

import { BatchForm } from "./BatchForm";

import { useGetBranchesQuery } from "@/appstore/modules/branch/api";

import {
  useCreateBatchMutation,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
} from "@/appstore/modules/batch/api";
import { BatchFormData, Branch } from "@/lib/home";

type TableRow = {
  // key: string | number;
  id: number;
  batchName: string;
  maxStudents: number;
  status: "active" | "inactive";
  users: number;
  branchId: number;
  branchName: string;
  rowSpan: number;
  isEmpty?: boolean;
};

export default function BatchPage() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<TableRow | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // APIs
  const { data: branchData, isLoading } = useGetBranchesQuery();

  const [createBatch] = useCreateBatchMutation();
  const [updateBatch] = useUpdateBatchMutation();
  const [deleteBatch] = useDeleteBatchMutation();

  const branches = branchData?.branches || [];

  const openModal = (type: "create" | "edit", item?: TableRow) => {
    setMode(type);
    setSelected(item || null);
    setModalOpen(true);
  };

  const handleSubmit = async (values: BatchFormData) => {
    try {
      if (mode === "create") {
        await createBatch(values).unwrap();
      } else if (selected) {
        await updateBatch({
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
    if (!deleteId) return;
    await deleteBatch(deleteId).unwrap();
    setDeleteId(null);
  };

  const tableData = branches.flatMap((branch: Branch): TableRow[] => {
    return branch.batches.map((batch) => ({
      id: batch.id,
      batchName: batch.batchName,
      maxStudents: batch.maxStudents,
      status: batch.status,
      users: batch._count.users,
      branchId: branch.id,
      branchName: branch.branchName,
      rowSpan: 0,
    }));
  });

  // filter search
  const filtered = tableData.filter(
    (b) =>
      b.batchName.toLowerCase().includes(search.toLowerCase()) ||
      b.branchName.toLowerCase().includes(search.toLowerCase()),
  );
  // console.log(filtered);

  const groupSizeMap = filtered.reduce<Record<number, number>>((acc, row) => {
    acc[row.branchId] = (acc[row.branchId] || 0) + 1;
    return acc;
  }, {});

  const seenBranches = new Set<number>();

  const filteredWithRowSpan = filtered.map((row) => {
    if (seenBranches.has(row.branchId)) {
      return { ...row, rowSpan: 0 };
    }
    seenBranches.add(row.branchId);
    return { ...row, rowSpan: groupSizeMap[row.branchId] };
  });

  const columns: ColumnsType<TableRow> = [
    {
      title: "Branch",
      dataIndex: "branchName",
      width: 160,
      ellipsis: true,
      render: (text, record) => ({
        children: text,
        props: {
          rowSpan: record.rowSpan,
        },
      }),
    },
    {
      title: "Batch",
      dataIndex: "batchName",
      width: 160,
      ellipsis: true,
    },
    {
      title: "Max Students",
      dataIndex: "maxStudents",
      width: 120,
      align: "center",
    },
    {
      title: "Users",
      dataIndex: "users",
      width: 100,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
      align: "center",
      render: (s) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            s === "active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {s}
        </span>
      ),
    },
    {
      title: "Actions",
      width: 140,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => openModal("edit", record)}>
            Edit
          </Button>
          <Button danger size="small" onClick={() => setDeleteId(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const initial = selected
    ? {
        batchName: selected.batchName,
        branchId: selected.branchId,
        maxStudents: Number(selected.maxStudents),
        status: selected.status,
      }
    : undefined;

  return (
    <div className="p-6 space-y-6">
      {/* header */}
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Batches</h2>

        <button
          onClick={() => openModal("create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Batch
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
      <ReusableTable columns={columns} data={filteredWithRowSpan} loading={isLoading} />

      {/* modal */}
      <AppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={mode === "create" ? "Create Batch" : "Edit Batch"}
      >
        <BatchForm
          branches={branches}
          initial={initial}
          onSubmit={handleSubmit}
        />
      </AppModal>

      {/* delete */}
      <DeleteConfirmModal
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Batch"
        content="Are you sure you want to delete this batch?"
      />
    </div>
  );
}
