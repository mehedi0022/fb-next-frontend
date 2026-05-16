"use client";

import {
  ProductAttribute,
  useAddAttributeValuesMutation,
  useCreateAttributeMutation,
  useDeleteAttributeMutation,
  useDeleteAttributeValueMutation,
  useGetAllAttributesQuery,
  useUpdateAttributeMutation,
} from "@/appstore/modules/products/api";
import { AppModal } from "@/components/admin/common/AppModal";
import { ReusableTable } from "@/components/admin/common/ReusableTable";
import { Button, Form, Input, Popconfirm, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

type AttributeFormValues = {
  name: string;
  valuesText: string;
};

const parseValues = (text: string) =>
  text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export default function AttributesManagementPage() {
  const { data, isLoading } = useGetAllAttributesQuery();
  const [createAttribute, { isLoading: creating }] = useCreateAttributeMutation();
  const [updateAttribute, { isLoading: updating }] = useUpdateAttributeMutation();
  const [addAttributeValues, { isLoading: addingValues }] =
    useAddAttributeValuesMutation();
  const [deleteAttributeValue, { isLoading: deletingValue }] =
    useDeleteAttributeValueMutation();
  const [deleteAttribute, { isLoading: deleting }] = useDeleteAttributeMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProductAttribute | null>(null);
  const [form] = Form.useForm<AttributeFormValues>();

  const attributes = data?.data || [];

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const openEdit = (item: ProductAttribute) => {
    setEditing(item);
    form.setFieldsValue({
      name: item.name,
      valuesText: "",
    });
    setOpen(true);
  };

  const closeModal = () => {
    if (creating || updating || addingValues) return;
    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const onSubmit = async (values: AttributeFormValues) => {
    try {
      const response = editing
        ? await updateAttribute({ id: editing.id, name: values.name }).unwrap()
        : await createAttribute({
            name: values.name,
            values: parseValues(values.valuesText),
          }).unwrap();

      toast.success(response?.message || "Saved successfully.");

      if (editing && values.valuesText?.trim()) {
        const newValues = parseValues(values.valuesText);
        if (newValues.length > 0) {
          const addValuesResponse = await addAttributeValues({
            id: editing.id,
            values: newValues,
          }).unwrap();
          toast.success(addValuesResponse?.message || "Values added successfully.");
        }
      }

      closeModal();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Request failed."));
    }
  };

  const onDelete = async (id: number) => {
    try {
      const response = await deleteAttribute(id).unwrap();
      toast.success(response?.message || "Deleted successfully.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Delete failed."));
    }
  };

  const columns: ColumnsType<ProductAttribute> = [
    {
      title: "SI",
      width: 70,
      align: "center",
      render: (_: unknown, __: ProductAttribute, index: number) => index + 1,
    },
    { title: "Attribute Name", dataIndex: "name" },
    {
      title: "Values",
      render: (_: unknown, item: ProductAttribute) =>
        (item.values || []).map((v) => v.value).join(", "),
    },
    {
      title: "Action",
      align: "center",
      render: (_: unknown, item: ProductAttribute) => (
        <Space>
          <Button size="small" onClick={() => openEdit(item)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this attribute?"
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
        <h1 className="text-xl font-semibold">Attribute Management</h1>
        <Button type="primary" icon={<Plus size={14} />} onClick={openCreate}>
          Add Attribute
        </Button>
      </div>

      <ReusableTable columns={columns} data={attributes} loading={isLoading} />

      <AppModal
        open={open}
        onClose={closeModal}
        title={editing ? "Update Attribute" : "Create Attribute"}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label="Attribute Name"
            name="name"
            rules={[{ required: true, message: "Attribute name is required" }]}
          >
            <Input placeholder="Enter attribute name (e.g. Color)" />
          </Form.Item>

          <Form.Item
            label={
              editing
                ? "Add Values (comma separated)"
                : "Values (comma separated)"
            }
            name="valuesText"
            rules={
              editing
                ? []
                : [{ required: true, message: "At least one value is required" }]
            }
          >
            <Input.TextArea
              rows={4}
              placeholder="Red, Blue, Green, Black, White"
            />
          </Form.Item>

          {editing && (
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-slate-700">
                Existing Values
              </p>
              <div className="flex flex-wrap gap-2">
                {(editing.values || []).map((valueItem) => (
                  <Button
                    key={valueItem.id}
                    size="small"
                    danger
                    loading={deletingValue}
                    onClick={async () => {
                      try {
                        const response = await deleteAttributeValue(
                          valueItem.id,
                        ).unwrap();
                        toast.success(response?.message || "Value deleted.");
                      } catch (error) {
                        toast.error(getApiErrorMessage(error, "Delete failed."));
                      }
                    }}
                  >
                    {valueItem.value} ×
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button onClick={closeModal}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={creating || updating || addingValues}
            >
              {editing ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </AppModal>
    </div>
  );
}
