"use client";

import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { useGetAllCategoriesQuery } from "@/appstore/modules/products/api";
import type { ProductCategory } from "@/appstore/modules/products/api";
import {
  useCreateSellerCategoryMutation,
  useDeleteSellerCategoryMutation,
  useGetSellerCategoriesQuery,
  useGetSellerProductsQuery,
  useUpdateSellerCategoryMutation,
} from "@/appstore/modules/seller/panel.api";
import { DeleteConfirmModal } from "@/components/admin/common/DeleteConfirmModal";

export default function MyCategoriesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "active" | "inactive">("");
  const [isMenuViewFilter, setIsMenuViewFilter] = useState<"" | "true" | "false">("");
  const [isHomePageViewFilter, setIsHomePageViewFilter] = useState<
    "" | "true" | "false"
  >("");
  const [isFeaturedFilter, setIsFeaturedFilter] = useState<"" | "true" | "false">("");

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: "deactivate" | "delete";
    categoryId: number;
    categoryName: string;
    affectedProducts: number;
  } | null>(null);

  const { data: sellerCategoriesRes, isLoading } =
    useGetSellerCategoriesQuery({
      status: statusFilter || undefined,
      isMenuView:
        isMenuViewFilter === "" ? undefined : isMenuViewFilter === "true",
      isHomePageView:
        isHomePageViewFilter === ""
          ? undefined
          : isHomePageViewFilter === "true",
      isFeatured:
        isFeaturedFilter === "" ? undefined : isFeaturedFilter === "true",
    });

  const { data: allSellerCategoriesRes } = useGetSellerCategoriesQuery();
  const { data: allSellerProductsRes } = useGetSellerProductsQuery({
    page: 1,
    limit: 1000,
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
  const allSellerCategories = useMemo(
    () => allSellerCategoriesRes?.data ?? [],
    [allSellerCategoriesRes?.data],
  );
  const allSellerProducts = useMemo(
    () => allSellerProductsRes?.data ?? [],
    [allSellerProductsRes?.data],
  );

  const totalCategories = allSellerCategories.length;
  const activeCategories = allSellerCategories.filter(
    (item) => item.status === "active",
  ).length;
  const inactiveCategories = allSellerCategories.filter(
    (item) => item.status === "inactive",
  ).length;

  const flattenLeafCategories = (nodes: ProductCategory[]) => {
    const out: Array<{ id: number; name: string }> = [];
    const walk = (items: ProductCategory[], prefix = "") => {
      items.forEach((item) => {
        const label = prefix ? `${prefix} > ${item.name}` : item.name;
        if (item.children?.length) {
          walk(item.children, label);
        } else {
          out.push({ id: item.id, name: label });
        }
      });
    };
    walk(nodes);
    return out;
  };

  const flatCategoryOptions = useMemo(
    () => flattenLeafCategories(allCategoriesRes?.data ?? []),
    [allCategoriesRes?.data],
  );

  const existingCategoryIds = useMemo(
    () => new Set(sellerCategories.map((item) => item.categoryId)),
    [sellerCategories],
  );

  const availableCategories = flatCategoryOptions.filter(
    (item) => !existingCategoryIds.has(item.id),
  );

  const handleResetFilter = () => {
    setSearch("");
    setStatusFilter("");
    setIsMenuViewFilter("");
    setIsHomePageViewFilter("");
    setIsFeaturedFilter("");
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

  const handleToggleStatus = async (id: number, currentStatus: "active" | "inactive") => {
    const nextStatus = currentStatus === "active" ? "inactive" : "active";
    if (nextStatus === "inactive") {
      const targetCategory = allSellerCategories.find((item) => item.id === id);
      const affectedProducts = allSellerProducts.filter(
        (item) => item.categoryId === targetCategory?.categoryId && item.status === "active",
      ).length;

      setPendingAction({
        type: "deactivate",
        categoryId: id,
        categoryName: targetCategory?.category?.name ?? "this category",
        affectedProducts,
      });
      setModalOpen(true);
      return;
    }

    try {
      await updateSellerCategory({ id, status: nextStatus }).unwrap();
      toast.success(`Category ${nextStatus}.`);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update category status."));
    }
  };

  const handleDelete = async (id: number) => {
    const targetCategory = allSellerCategories.find((item) => item.id === id);
    const affectedProducts = allSellerProducts.filter(
      (item) => item.categoryId === targetCategory?.categoryId && item.status === "active",
    ).length;

    setPendingAction({
      type: "delete",
      categoryId: id,
      categoryName: targetCategory?.category?.name ?? "this category",
      affectedProducts,
    });
    setModalOpen(true);
  };

  const handleConfirmModal = async () => {
    if (!pendingAction) return;

    try {
      if (pendingAction.type === "deactivate") {
        const result = await updateSellerCategory({
          id: pendingAction.categoryId,
          status: "inactive",
        }).unwrap();
        toast.success(
          result?.meta?.affectedProducts
            ? `Category inactive. ${result.meta.affectedProducts} products also inactivated.`
            : "Category inactive.",
        );
      } else {
        const result = await deleteSellerCategory(pendingAction.categoryId).unwrap();
        toast.success(
          result?.meta?.affectedProducts
            ? `Category deleted. ${result.meta.affectedProducts} products also deleted.`
            : result?.message || "Category deleted.",
        );
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update category."));
    } finally {
      setModalOpen(false);
      setPendingAction(null);
    }
  };

  const visibleCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return sellerCategories;
    return sellerCategories.filter((item) =>
      item.category?.name?.toLowerCase().includes(query),
    );
  }, [search, sellerCategories]);

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
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Menu View
              </label>
              <select
                value={isMenuViewFilter}
                onChange={(e) =>
                  setIsMenuViewFilter(e.target.value as "" | "true" | "false")
                }
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Home View
              </label>
              <select
                value={isHomePageViewFilter}
                onChange={(e) =>
                  setIsHomePageViewFilter(e.target.value as "" | "true" | "false")
                }
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Featured
              </label>
              <select
                value={isFeaturedFilter}
                onChange={(e) =>
                  setIsFeaturedFilter(e.target.value as "" | "true" | "false")
                }
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
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
                ) : visibleCategories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  visibleCategories.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3">{item.category?.name}</td>
                      <td className="px-4 py-3">
                        {item.category?.parent?.name || "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          disabled={isUpdating}
                          onClick={() => handleToggleStatus(item.id, item.status)}
                          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                            item.status === "active" ? "bg-emerald-500" : "bg-slate-300"
                          } ${isUpdating ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                          aria-label="Toggle category status"
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                              item.status === "active" ? "translate-x-8" : "translate-x-1"
                            }`}
                          />
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
        </div>
      </div>
      <DeleteConfirmModal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setPendingAction(null);
        }}
        onConfirm={handleConfirmModal}
        title={pendingAction?.type === "delete" ? "Delete Category" : "Deactivate Category"}
        okText={pendingAction?.type === "delete" ? "Delete" : "Deactivate"}
        confirmLoading={isUpdating || isDeleting}
        content={
          pendingAction
            ? pendingAction.type === "delete"
              ? `If you delete "${pendingAction.categoryName}", ${pendingAction.affectedProducts} product(s) under this category will also be deleted permanently.`
              : `If you deactivate "${pendingAction.categoryName}", ${pendingAction.affectedProducts} active product(s) under this category will also be set inactive.`
            : "Are you sure?"
        }
      />
    </div>
  );
}

