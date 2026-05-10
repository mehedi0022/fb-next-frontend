// =============================
// FIXED PackagesPage.tsx
// =============================
"use client";

import { useState } from "react";
import {
    useGetAllPackagesQuery,
    useDeletePackageMutation,
} from "@/appstore/modules/packages/api";
import { toast } from "react-toastify";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PackageItem, PackagesResponse } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";
import { CreatePackages, EditPackage } from "@/components/admin";
import { ColumnsType } from "antd/es/table";
import { ReusableTable } from "@/components/admin/common/ReusableTable";

export default function PackagesPage() {
    const { data, isLoading } = useGetAllPackagesQuery() as {
        data?: PackagesResponse;
        isLoading: boolean;
    };

    const [deletePackage] = useDeletePackageMutation();

    // Modal states
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedPkg, setSelectedPkg] = useState<PackageItem | null>(null);

    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    // Edit handler
    const openEditModal = (pkg: PackageItem) => {
        setSelectedPkg(pkg);
        setEditOpen(true);
    };

    // Delete handler
    const onDelete = async (id: number) => {
        try {
            const result = await deletePackage(id);
            if ("data" in result && (result.data as { success: boolean })?.success) {
                toast.success("Package মুছে গেছে!");
            } else {
                toast.error("মুছতে সমস্যা হয়েছে।");
            }
        } catch {
            toast.error("মুছতে সমস্যা হয়েছে।");
        } finally {
            setDeleteConfirmId(null);
        }
    };

    const formatPrice = (price: string) => `৳${Number(price).toLocaleString()}`;

    // Colums data
    const columns: ColumnsType<PackageItem> = [
        {
            title: "SI",
            width: 80,
            align: "center",
            render: (_: unknown, __: PackageItem, index: number) => index + 1,
        },

        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },

        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: string) => formatPrice(price),
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (status: string) => (
                <span
                    className={`px-2 py-1 rounded text-xs font-medium ${status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {status}
                </span>
            ),
        },

        {
            title: "Created",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt?: string) =>
                createdAt ? formatDate(createdAt) : "-",
        },

        {
            title: "Action",
            key: "action",
            align: "center",

            render: (_: unknown, pkg: PackageItem) => (
                <div className="flex justify-center gap-2">
                    {/* Edit */}
                    <button
                        onClick={() => openEditModal(pkg)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition"
                    >
                        <Pencil className="w-3 h-3" />
                        Edit
                    </button>

                    {/* Delete Confirm */}
                    {deleteConfirmId === pkg.id ? (
                        <>
                            <button
                                onClick={() => onDelete(pkg.id)}
                                className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                হ্যাঁ
                            </button>

                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md"
                            >
                                না
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setDeleteConfirmId(pkg.id)}
                            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Package management</h1>
                </div>

                <button
                    onClick={() => setCreateOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                    <Plus className="w-4 h-4" />
                    New package
                </button>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {isLoading ? (
                    <div className="p-10 text-center text-gray-400 text-sm">
                        লোড হচ্ছে...
                    </div>
                ) : (
                    <ReusableTable<PackageItem>
                        columns={columns}
                        data={data?.data || []}
                        loading={isLoading}
                    />
                )}
            </div>

            {/* Create */}
            <CreatePackages open={createOpen} setOpen={setCreateOpen} />

            {/* Edit */}
            <EditPackage
                openEdit={editOpen}
                setEditOpen={setEditOpen}
                selectedPkg={selectedPkg}
                setSelectedPkg={setSelectedPkg}
            />
        </div>
    );
}
