"use client";

import {
  ProductBrand,
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useGetAllBrandsQuery,
  useUpdateBrandMutation,
} from "@/appstore/modules/products/api";
import { AppModal } from "@/components/admin/common/AppModal";
import { ReusableTable } from "@/components/admin/common/ReusableTable";
import { Button, Form, Input, Popconfirm, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type BrandFormValues = { name: string };

export default function BrandsManagementPage() {
  const { data, isLoading } = useGetAllBrandsQuery();
  const [createBrand, { isLoading: creating }] = useCreateBrandMutation();
  const [updateBrand, { isLoading: updating }] = useUpdateBrandMutation();
  const [deleteBrand, { isLoading: deleting }] = useDeleteBrandMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProductBrand | null>(null);
  const [form] = Form.useForm<BrandFormValues>();

  const brands = data?.data || [];

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const openEdit = (item: ProductBrand) => {
    setEditing(item);
    form.setFieldsValue({ name: item.name });
    setOpen(true);
  };

  const closeModal = () => {
    if (creating || updating) return;
    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const onSubmit = async (values: BrandFormValues) => {
    try {
      const response = editing
        ? await updateBrand({ id: editing.id, name: values.name }).unwrap()
        : await createBrand({ name: values.name }).unwrap();

      toast.success(response?.message || "Saved successfully.");
      closeModal();
    } catch (error) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Request failed.";
      toast.error(message);
    }
  };

  const onDelete = async (id: number) => {
    try {
      const response = await deleteBrand(id).unwrap();
      toast.success(response?.message || "Deleted successfully.");
    } catch (error) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Delete failed.";
      toast.error(message);
    }
  };

  const columns: ColumnsType<ProductBrand> = [
    {
      title: "SI",
      width: 70,
      align: "center",
      render: (_: unknown, __: ProductBrand, index: number) => index + 1,
    },
    { title: "Brand Name", dataIndex: "name" },
    {
      title: "Action",
      align: "center",
      render: (_: unknown, item: ProductBrand) => (
        <Space>
          <Button size="small" onClick={() => openEdit(item)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this brand?"
            onConfirm={() => onDelete(item.id)}
            okButtonProps={{ loading: deleting }}
          >
            <Button size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Brand Management</h1>
        <Button type="primary" icon={<Plus size={14} />} onClick={openCreate}>
          Add Brand
        </Button>
      </div>

      <ReusableTable columns={columns} data={brands} loading={isLoading} />

      <AppModal
        open={open}
        onClose={closeModal}
        title={editing ? "Update Brand" : "Create Brand"}
        width={520}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label="Brand Name"
            name="name"
            rules={[{ required: true, message: "Brand name is required" }]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={creating || updating}>
              {editing ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </AppModal>
    </div>
  );
}
