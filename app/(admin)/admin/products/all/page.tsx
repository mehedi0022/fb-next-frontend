"use client";

import {
  ProductListItem,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useHardDeleteProductMutation,
} from "@/appstore/modules/products/api";
import { ReusableTable } from "@/components/admin/common/ReusableTable";
import { Button, Input, Popconfirm, Select, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const priceText = (price?: ProductListItem["suggestedPrice"]) => {
  if (!price) return "BDT 0";
  if (price.type === "fixed") return `${Number(price.value).toLocaleString()}`;
  return `${Number(price.min).toLocaleString()} - ${Number(price.max).toLocaleString()}`;
};

export default function ProductListPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const metric = searchParams.get("metric");
  const threshold = Number(searchParams.get("threshold") || "10");
  const days = Number(searchParams.get("days") || "7");
  const search = (searchParams.get("search") || "").trim();
  const isActiveParam = searchParams.get("isActive");
  const [searchInput, setSearchInput] = useState(search);
  const isActive =
    isActiveParam === "true"
      ? true
      : isActiveParam === "false"
        ? false
        : undefined;

  const { data, isLoading } = useGetAllProductsQuery({
    page: 1,
    limit: 100,
    search: search || undefined,
    isActive,
    metric: (metric as
      | "low-stock"
      | "out-of-stock"
      | "new-arrivals"
      | "draft"
      | null) || undefined,
    threshold: Number.isFinite(threshold) ? threshold : undefined,
    days: Number.isFinite(days) ? days : undefined,
  });
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();
  const [hardDeleteProduct, { isLoading: hardDeleting }] =
    useHardDeleteProductMutation();

  const onSoftDelete = async (id: number) => {
    try {
      const result = await deleteProduct(id).unwrap();
      toast.success(result?.message || "Product deactivated.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Delete failed."));
    }
  };

  const onHardDelete = async (id: number) => {
    try {
      const result = await hardDeleteProduct(id).unwrap();
      toast.success(result?.message || "Product deleted permanently.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Delete failed."));
    }
  };

  const columns: ColumnsType<ProductListItem> = [
    {
      title: "SI",
      width: 70,
      align: "start",
      render: (_: unknown, __: ProductListItem, index: number) => index + 1,
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Category",
      align: "center",
      render: (_: unknown, item: ProductListItem) => item.category?.name || "-",
    },
    {
      title: "Brand",
      align: "center",
      render: (_: unknown, item: ProductListItem) => item.brand?.name || "-",
    },
    {
      title: "Price",
      align: "center",
      render: (_: unknown, item: ProductListItem) =>
        priceText(item.suggestedPrice),
    },
    {
      title: "Stock",
      align: "center",
      render: (_: unknown, item: ProductListItem) => item.totalStock ?? 0,
    },
    {
      title: "Status",
      align: "center",
      render: (_: unknown, item: ProductListItem) =>
        item.isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Action",
      align: "end",
      render: (_: unknown, item: ProductListItem) => (
        <Space>
          <Link href={`/admin/products/edit/${item.id}`}>
            <Button size="small">Edit</Button>
          </Link>
          <Popconfirm
            title="Deactivate this product?"
            onConfirm={() => onSoftDelete(item.id)}
            okButtonProps={{ loading: deleting }}>
            <Button size="small" danger>
              Deactivate
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Permanently delete this product?"
            onConfirm={() => onHardDelete(item.id)}
            okButtonProps={{ loading: hardDeleting }}>
            <Button size="small">Hard Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const setQueryParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
    });
    router.push(`${pathname}?${next.toString()}`);
  };

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const normalized = searchInput.trim();
      if (normalized === search) return;
      setQueryParams({ search: normalized || null });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, search]);

  return (
    <div className="space-y-5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Product List</h1>
          {metric ? (
            <p className="text-xs text-slate-500">
              Active filter: {metric}
              {metric === "low-stock" ? ` (threshold &lt; ${threshold})` : ""}
              {metric === "new-arrivals" ? ` (last ${days} days)` : ""}
            </p>
          ) : null}
        </div>
        <Link href="/admin/products/add">
          <Button type="primary">Create Product</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-6">
        <Input
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Select
          placeholder="Metric"
          allowClear
          value={metric || undefined}
          onChange={(value) => setQueryParams({ metric: value || null })}
          options={[
            { value: "low-stock", label: "Low Stock" },
            { value: "out-of-stock", label: "Out of Stock" },
            { value: "new-arrivals", label: "New Arrivals" },
            { value: "draft", label: "Draft / Unpublished" },
          ]}
        />
        <Select
          placeholder="Threshold"
          value={threshold}
          onChange={(value) => setQueryParams({ threshold: String(value) })}
          options={[5, 10, 20, 50].map((value) => ({
            value,
            label: `< ${value}`,
          }))}
        />
        <Select
          placeholder="Days"
          value={days}
          onChange={(value) => setQueryParams({ days: String(value) })}
          options={[
            { value: 7, label: "Last 7 days" },
            { value: 30, label: "Last 30 days" },
          ]}
        />
        <Select
          placeholder="Status"
          allowClear
          value={isActiveParam || undefined}
          onChange={(value) => setQueryParams({ isActive: value || null })}
          options={[
            { value: "true", label: "Published" },
            { value: "false", label: "Draft" },
          ]}
        />
        <Button
          onClick={() => router.push(pathname)}
          className="w-full border-slate-300">
          Reset Filters
        </Button>
      </div>
      <ReusableTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
      />
    </div>
  );
}
