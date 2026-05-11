"use client";

import {
  ProductListItem,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useHardDeleteProductMutation,
} from "@/appstore/modules/products/api";
import { ReusableTable } from "@/components/admin/common/ReusableTable";
import { Button, Popconfirm, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { toast } from "react-toastify";

const priceText = (price?: ProductListItem["suggestedPrice"]) => {
  if (!price) return "BDT 0";
  if (price.type === "fixed") return `BDT ${Number(price.value).toLocaleString()}`;
  return `BDT ${Number(price.min).toLocaleString()} - ${Number(price.max).toLocaleString()}`;
};

export default function ProductListPage() {
  const { data, isLoading } = useGetAllProductsQuery({ page: 1, limit: 50 });
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();
  const [hardDeleteProduct, { isLoading: hardDeleting }] =
    useHardDeleteProductMutation();

  const onSoftDelete = async (id: number) => {
    try {
      const result = await deleteProduct(id).unwrap();
      toast.success(result?.message || "Product deactivated.");
    } catch (error) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Delete failed.";
      toast.error(message);
    }
  };

  const onHardDelete = async (id: number) => {
    try {
      const result = await hardDeleteProduct(id).unwrap();
      toast.success(result?.message || "Product deleted permanently.");
    } catch (error) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Delete failed.";
      toast.error(message);
    }
  };

  const columns: ColumnsType<ProductListItem> = [
    {
      title: "SI",
      width: 70,
      align: "center",
      render: (_: unknown, __: ProductListItem, index: number) => index + 1,
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Category",
      render: (_: unknown, item: ProductListItem) => item.category?.name || "-",
    },
    {
      title: "Brand",
      render: (_: unknown, item: ProductListItem) => item.brand?.name || "-",
    },
    {
      title: "Price",
      render: (_: unknown, item: ProductListItem) => priceText(item.suggestedPrice),
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
        item.isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "Action",
      align: "center",
      render: (_: unknown, item: ProductListItem) => (
        <Space>
          <Link href={`/admin/products/edit/${item.id}`}>
            <Button size="small">Edit</Button>
          </Link>
          <Popconfirm
            title="Deactivate this product?"
            onConfirm={() => onSoftDelete(item.id)}
            okButtonProps={{ loading: deleting }}
          >
            <Button size="small" danger>
              Deactivate
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Permanently delete this product?"
            onConfirm={() => onHardDelete(item.id)}
            okButtonProps={{ loading: hardDeleting }}
          >
            <Button size="small">Hard Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Product List</h1>
        <Link href="/admin/products/add">
          <Button type="primary">Create Product</Button>
        </Link>
      </div>
      <ReusableTable columns={columns} data={data?.data || []} loading={isLoading} />
    </div>
  );
}
