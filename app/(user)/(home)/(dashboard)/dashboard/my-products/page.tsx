"use client";

import { useMemo, useState } from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { useGetAllProductsQuery } from "@/appstore/modules/products/api";
import {
  useCreateSellerProductMutation,
  useDeleteSellerProductMutation,
  useGetSellerProductsQuery,
  useUpdateSellerProductMutation,
} from "@/appstore/modules/seller/panel.api";

const PAGE_SIZE = 10;

export default function MyProductsPage() {
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "active" | "inactive">("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedProductId, setSelectedProductId] = useState<number | "">("");
  const [price, setPrice] = useState("");
  const [previousPrice, setPreviousPrice] = useState("");

  const {
    data: sellerProductsRes,
    isLoading,
    isFetching,
  } = useGetSellerProductsQuery({
    page: currentPage,
    limit: PAGE_SIZE,
    search: appliedSearch || undefined,
    status: statusFilter || undefined,
  });

  const { data: activeMetaRes } = useGetSellerProductsQuery({
    page: 1,
    limit: 1,
    status: "active",
  });
  const { data: inactiveMetaRes } = useGetSellerProductsQuery({
    page: 1,
    limit: 1,
    status: "inactive",
  });

  const { data: allProductsRes } = useGetAllProductsQuery({
    page: 1,
    limit: 100,
    isActive: true,
  });

  const [createSellerProduct, { isLoading: isCreating }] =
    useCreateSellerProductMutation();
  const [updateSellerProduct, { isLoading: isUpdating }] =
    useUpdateSellerProductMutation();
  const [deleteSellerProduct, { isLoading: isDeleting }] =
    useDeleteSellerProductMutation();

  const sellerProducts = useMemo(
    () => sellerProductsRes?.data ?? [],
    [sellerProductsRes?.data],
  );
  const meta = sellerProductsRes?.meta;
  const sourceProducts = allProductsRes?.data ?? [];
  const totalProducts = meta?.total ?? 0;
  const activeProducts = activeMetaRes?.meta?.total ?? 0;
  const inactiveProducts = inactiveMetaRes?.meta?.total ?? 0;

  const alreadyAddedIds = useMemo(
    () => new Set(sellerProducts.map((item) => item.productId)),
    [sellerProducts],
  );

  const availableProducts = sourceProducts.filter(
    (item) => !alreadyAddedIds.has(item.id),
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
    if (!selectedProductId) {
      toast.warning("Select a product first.");
      return;
    }
    if (!price) {
      toast.warning("Price is required.");
      return;
    }

    try {
      const body: {
        productId: number;
        price: number;
        previousePrice?: number;
      } = {
        productId: Number(selectedProductId),
        price: Number(price),
      };

      if (previousPrice) {
        body.previousePrice = Number(previousPrice);
      }

      const result = await createSellerProduct(body).unwrap();
      toast.success(result?.message || "Product added to your panel.");
      setSelectedProductId("");
      setPrice("");
      setPreviousPrice("");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to add product."));
    }
  };

  const handleToggleStatus = async (
    id: number,
    currentStatus: "active" | "inactive",
  ) => {
    const nextStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateSellerProduct({ id, status: nextStatus }).unwrap();
      toast.success(`Product ${nextStatus}.`);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update status."));
    }
  };

  const handleDelete = async (id: number) => {
    const ok = window.confirm("Delete this product from your panel?");
    if (!ok) return;
    try {
      const result = await deleteSellerProduct(id).unwrap();
      toast.success(result?.message || "Product deleted.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete product."));
    }
  };

  const onPageChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs text-slate-500">Total Products</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">{totalProducts}</p>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs text-slate-500">Active</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">{activeProducts}</p>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs text-slate-500">Inactive</p>
            <p className="mt-2 text-3xl font-bold text-slate-500">{inactiveProducts}</p>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">Add Product</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <select
              value={selectedProductId}
              onChange={(e) =>
                setSelectedProductId(e.target.value ? Number(e.target.value) : "")
              }
              className="rounded-lg border px-3 py-2 text-sm"
            >
              <option value="">Select product</option>
              {availableProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              min="1"
              placeholder="Your price"
              className="rounded-lg border px-3 py-2 text-sm"
            />
            <input
              value={previousPrice}
              onChange={(e) => setPreviousPrice(e.target.value)}
              type="number"
              min="1"
              placeholder="Previous price (optional)"
              className="rounded-lg border px-3 py-2 text-sm"
            />
            <button
              onClick={handleCreate}
              disabled={isCreating}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isCreating ? "Adding..." : "Add Product"}
            </button>
          </div>
        </div>

        <div className="rounded-xl border bg-white">
          <div className="flex flex-wrap items-end gap-3 border-b p-4">
            <div className="min-w-[220px] flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Search
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyFilter()}
                placeholder="Search product name"
                className="w-full rounded-lg border px-3 py-2 text-sm"
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
                className="rounded-lg border px-3 py-2 text-sm"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button
              onClick={handleApplyFilter}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Filter
            </button>
            <button
              onClick={handleResetFilter}
              className="rounded-lg border px-4 py-2 text-sm font-medium"
            >
              Reset
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">
                    Product
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase text-slate-500">
                    Previous Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase text-slate-500">
                    Your Price
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
                    <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                      Loading products...
                    </td>
                  </tr>
                ) : sellerProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  sellerProducts.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3">{item.product?.name}</td>
                      <td className="px-4 py-3 text-right">
                        {item.previousePrice ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-right">{item.price ?? "-"}</td>
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
