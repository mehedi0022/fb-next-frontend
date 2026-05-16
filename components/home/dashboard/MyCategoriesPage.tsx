"use client";

import { useMemo, useState } from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { useGetAllCategoriesQuery } from "@/appstore/modules/products/api";
import type { ProductCategory } from "@/appstore/modules/products/api";
import {
  useCreateSellerCategoryMutation,
  useDeleteSellerCategoryMutation,
  useGetSellerCategoriesQuery,
  useUpdateSellerCategoryMutation,
} from "@/appstore/modules/seller/panel.api";

const PAGE_SIZE = 10;

export default function MyCategoriesPage() {
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "active" | "inactive">("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");

  const { data: sellerCategoriesRes, isLoading, isFetching } =
    useGetSellerCategoriesQuery({
      page: currentPage,
      limit: PAGE_SIZE,
      search: appliedSearch || undefined,
      status: statusFilter || undefined,
    });

  const { data: activeMetaRes } = useGetSellerCategoriesQuery({
    page: 1,
    limit: 1,
    status: "active",
  });
  const { data: inactiveMetaRes } = useGetSellerCategoriesQuery({
    page: 1,
    limit: 1,
    status: "inactive",
  });

  const { data: allCategoriesRes } = useGetAllCategoriesQuery();

  const [createSellerCategory, { isLoading: isCreating }] =
    useCreateSellerCategoryMutation();
  const [updateSellerCategory, { isLoading: isUpdating }] =
    useUpdateSellerCategoryMutation();
  const [deleteSellerCategory, { isLoading: isDeleting }] =
    useDeleteSellerCategoryMutation();

  const sellerCategories = useMemo(
    () => sellerCategoriesRes?.data ?? [],
    [sellerCategoriesRes?.data],
  );
  const meta = sellerCategoriesRes?.meta;
  const totalCategories = meta?.total ?? 0;
  const activeCategories = activeMetaRes?.meta?.total ?? 0;
  const inactiveCategories = inactiveMetaRes?.meta?.total ?? 0;

  const flattenCategories = (nodes: ProductCategory[]) => {
    const out: Array<{ id: number; name: string }> = [];
    const walk = (items: ProductCategory[], prefix = "") => {
      items.forEach((item) => {
        out.push({ id: item.id, name: prefix ? `${prefix} > ${item.name}` : item.name });
        if (item.children?.length) {
          walk(item.children, prefix ? `${prefix} > ${item.name}` : item.name);
        }
      });
    };
    walk(nodes);
    return out;
  };

  const flatCategoryOptions = useMemo(
    () => flattenCategories(allCategoriesRes?.data ?? []),
    [allCategoriesRes?.data],
  );

  const existingCategoryIds = useMemo(
    () => new Set(sellerCategories.map((item) => item.categoryId)),
    [sellerCategories],
  );

  const availableCategories = flatCategoryOptions.filter(
    (item) => !existingCategoryIds.has(item.id),
  );

  const handleApplyFilter = () => {
    setAppliedSearch(search.trim());
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setSearch("");
    setAppliedSearch("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  const handleCreate = async () => {
    if (!selectedCategoryId) {
      toast.warning("Select a category first.");
      return;
    }
    try {
      const result = await createSellerCategory({
        categoryId: Number(selectedCategoryId),
      }).unwrap();
      toast.success(result?.message || "Category added to your panel.");
      setSelectedCategoryId("");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to add category."));
    }
  };

  const handleToggleStatus = async (
    id: number,
    currentStatus: "active" | "inactive",
  ) => {
    const nextStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateSellerCategory({ id, status: nextStatus }).unwrap();
      toast.success(`Category ${nextStatus}.`);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update category status."));
    }
  };

  const handleDelete = async (id: number) => {
    const ok = window.confirm("Delete this category from your panel?");
    if (!ok) return;
    try {
      const result = await deleteSellerCategory(id).unwrap();
      toast.success(result?.message || "Category deleted.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete category."));
    }
  };

  const onPageChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
            <p className="text-xs text-slate-500">Total Categories</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">{totalCategories}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
            <p className="text-xs text-slate-500">Active</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">{activeCategories}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
            <p className="text-xs text-slate-500">Inactive</p>
            <p className="mt-2 text-3xl font-bold text-slate-500">{inactiveCategories}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">Add Category</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <select
              value={selectedCategoryId}
              onChange={(e) =>
                setSelectedCategoryId(e.target.value ? Number(e.target.value) : "")
              }
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm md:col-span-2"
            >
              <option value="">Select category</option>
              {availableCategories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleCreate}
              disabled={isCreating}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isCreating ? "Adding..." : "Add Category"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-end gap-3 border-b p-4">
            <div className="min-w-[220px] flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Search
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyFilter()}
                placeholder="Search category name"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "" | "active" | "inactive")
                }
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button
              onClick={handleApplyFilter}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Filter
            </button>
            <button
              onClick={handleResetFilter}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium"
            >
              Reset
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">
                    Parent
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase text-slate-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">
                    Added
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                      Loading categories...
                    </td>
                  </tr>
                ) : sellerCategories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  sellerCategories.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3">{item.category?.name}</td>
                      <td className="px-4 py-3">
                        {item.category?.parent?.name || "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          disabled={isUpdating}
                          onClick={() => handleToggleStatus(item.id, item.status)}
                          className={`rounded px-2 py-1 text-xs font-semibold ${
                            item.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item.status}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          disabled={isDeleting}
                          onClick={() => handleDelete(item.id)}
                          className="rounded bg-rose-500 px-3 py-1 text-xs font-semibold text-white disabled:opacity-60"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {(meta?.total ?? 0) > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-2 border-t p-4">
              <p className="text-sm text-slate-500">
                Showing page {meta?.page} of {meta?.totalPages}
                {isFetching ? " (refreshing...)" : ""}
              </p>
              <Pagination
                current={meta?.page || 1}
                total={meta?.total || 0}
                pageSize={meta?.limit || PAGE_SIZE}
                onChange={onPageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

