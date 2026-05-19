"use client";

import {
  ProductCategory,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/appstore/modules/products/api";
import { AppModal } from "@/components/admin/common/AppModal";
import { ReusableTable } from "@/components/admin/common/ReusableTable";
import { Button, Form, Input, Popconfirm, Space, TreeSelect, Upload } from "antd";
import { ColumnsType } from "antd/es/table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";

type CategoryFormValues = {
  name: string;
  parentId?: number | "__root__";
  image?: UploadFile[];
};
type CategoryTreeRow = ProductCategory & {
  children?: CategoryTreeRow[];
};

export default function CategoriesManagementPage() {
  const { data, isLoading } = useGetAllCategoriesQuery();
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProductCategory | null>(null);
  const [form] = Form.useForm<CategoryFormValues>();

  const categories = (data?.data || []) as CategoryTreeRow[];

  const flattenCategories = (
    nodes: CategoryTreeRow[],
    parentId: number | null = null,
  ): ProductCategory[] => {
    return nodes.flatMap((node) => {
      const current: ProductCategory = {
        id: node.id,
        name: node.name,
        slug: node.slug,
        parentId: parentId ?? node.parentId ?? null,
      };
      const children = flattenCategories(node.children || [], node.id);
      return [current, ...children];
    });
  };

  const flatCategories = flattenCategories(categories);
  const categoryMap = new Map(flatCategories.map((item) => [item.id, item]));

  const getLevel = (categoryId?: number | null) => {
    if (!categoryId) return 1;
    let level = 1;
    let currentId: number | null | undefined = categoryId;
    while (currentId) {
      const current = categoryMap.get(currentId);
      if (!current?.parentId) break;
      level += 1;
      currentId = current.parentId;
    }
    return level;
  };

  const getCategoryPath = (item: ProductCategory) => {
    const parts: string[] = [item.name];
    let currentId = item.parentId;
    while (currentId) {
      const parent = categoryMap.get(currentId);
      if (!parent) break;
      parts.unshift(parent.name);
      currentId = parent.parentId ?? null;
    }
    return parts.join(" > ");
  };

  const getDescendantIds = (categoryId: number): number[] => {
    const descendants: number[] = [];
    const walk = (id: number) => {
      const children = flatCategories.filter((item) => item.parentId === id);
      children.forEach((child) => {
        descendants.push(child.id);
        walk(child.id);
      });
    };
    walk(categoryId);
    return descendants;
  };

  const treeRows = categories;

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const openEdit = (item: ProductCategory) => {
    setEditing(item);
    form.setFieldsValue({
      name: item.name,
      parentId: item.parentId ?? "__root__",
    });
    setOpen(true);
  };

  const closeModal = () => {
    if (creating || updating) return;
    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const uploadProps: UploadProps = {
    beforeUpload: () => false,
    maxCount: 1,
    accept: "image/png,image/jpeg,image/webp",
  };

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      const mappedParentId =
        values.parentId === "__root__" ? null : (values.parentId ?? null);

      const parentLevel = mappedParentId ? getLevel(mappedParentId) : 0;
      if (parentLevel >= 3) {
        toast.error("Maximum category depth is 3 levels.");
        return;
      }

      const payload = {
        name: values.name,
        parentId: mappedParentId,
        image: values.image?.[0]?.originFileObj as File | undefined,
      };
      const response = editing
        ? await updateCategory({ id: editing.id, ...payload }).unwrap()
        : await createCategory(payload).unwrap();

      toast.success(response?.message || "Saved successfully.");
      closeModal();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Request failed."));
    }
  };

  const onDelete = async (id: number) => {
    try {
      const response = await deleteCategory(id).unwrap();
      toast.success(response?.message || "Deleted successfully.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Delete failed."));
    }
  };

  const columns: ColumnsType<CategoryTreeRow> = [
    {
      title: "SI",
      width: 70,
      align: "center",
      render: (_: unknown, __: CategoryTreeRow, index: number) => index + 1,
    },
    { title: "Category Name", dataIndex: "name" },
    {
      title: "Image",
      render: (_: unknown, item: CategoryTreeRow) =>
        item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image.startsWith("http") ? item.image : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${item.image.replace(/\\/g, "/")}`}
            alt={item.name}
            className="h-10 w-10 rounded object-cover border"
          />
        ) : (
          "-"
        ),
    },
    {
      title: "Path",
      render: (_: unknown, item: CategoryTreeRow) => getCategoryPath(item),
    },
    {
      title: "Level",
      align: "center",
      render: (_: unknown, item: CategoryTreeRow) => getLevel(item.id),
    },
    {
      title: "Parent Category",
      render: (_: unknown, item: CategoryTreeRow) => {
        if (!item.parentId) return "Root";
        return (
          flatCategories.find((c) => c.id === item.parentId)?.name ||
          item.parentId
        );
      },
    },
    {
      title: "Action",
      align: "center",
      render: (_: unknown, item: CategoryTreeRow) => (
        <Space>
          <Button size="small" onClick={() => openEdit(item)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this category?"
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
        <h1 className="text-xl font-semibold">Category Management</h1>
        <Button type="primary" icon={<Plus size={14} />} onClick={openCreate}>
          Add Category
        </Button>
      </div>

      <ReusableTable columns={columns} data={treeRows} loading={isLoading} />

      <AppModal
        open={open}
        onClose={closeModal}
        title={editing ? "Update Category" : "Create Category"}
        width={560}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Category name is required" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item label="Parent Category" name="parentId">
            <TreeSelect
              placeholder="Select parent category"
              treeDefaultExpandAll
              treeData={[
                { value: "__root__", title: "Root (No Parent)", pId: 0 },
                ...flatCategories
                .filter((c) => getLevel(c.id) < 3)
                .filter((c) => c.id !== editing?.id)
                .filter((c) =>
                  editing ? !getDescendantIds(editing.id).includes(c.id) : true,
                )
                .map((item) => ({
                  value: item.id,
                  title: `${getCategoryPath(item)} (L${getLevel(item.id)})`,
                  pId: item.parentId ?? 0,
                })),
              ]}
              treeDataSimpleMode={{ id: "value", pId: "pId", rootPId: 0 }}
            />
          </Form.Item>

          <Form.Item
            label="Category Image (Optional)"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload {...uploadProps} listType="picture">
              <Button>Select Image</Button>
            </Upload>
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
