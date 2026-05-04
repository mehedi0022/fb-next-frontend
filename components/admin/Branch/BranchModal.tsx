"use client";

import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { BatchInBranch, Branch, BranchFormData } from "@/lib/home";



interface BranchModalProps {
  open: boolean;
  mode: "create" | "view" | "edit";
  initialValues?: Branch | null;
  onSubmit: (values: BranchFormData) => void;
  onCancel: () => void;
}

export const BranchModal = ({
  open,
  mode,
  initialValues,
  onSubmit,
  onCancel,
}: BranchModalProps) => {
  const [form] = Form.useForm();

  const isView = mode === "view";

  // ✅ form control
  useEffect(() => {
    if (!open) {
      form.resetFields();
    } else if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues]);

  // ✅ VIEW MODE UI (best UX)
  if (isView && initialValues) {
    return (
      <Modal
        open={open}
        onCancel={onCancel}
        footer={null}
        title="Branch Details"
      >
        <div className="space-y-4">
          <div>
            <p className="text-gray-500">Branch Name</p>
            <p className="font-semibold">{initialValues.branchName}</p>
          </div>

          <div>
            <p className="text-gray-500">Description</p>
            <p>{initialValues.branchDescription}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <span
              className={`px-2 py-1 rounded text-white text-sm ${
                initialValues.status === "active"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {initialValues.status}
            </span>
          </div>

          {/* batches */}
          <div>
            <p className="text-gray-500 mb-2">Batches</p>

            {initialValues.batches?.length ? (
              <div className="grid grid-cols-2 gap-2">
                {initialValues.batches.map((batch: BatchInBranch) => (
                  <div key={batch.id} className="border p-2 rounded-md text-sm">
                    {batch.batchName || `Batch ${batch.id}`}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No batches available</p>
            )}
          </div>
        </div>
      </Modal>
    );
  }

  // ✅ FORM MODE
  return (
    <Modal
      title={mode === "create" ? "Create Branch" : "Edit Branch"}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={mode === "create" ? "Create" : "Update"}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="branchName"
          label="Branch Name"
          rules={[{ required: true, message: "Branch name is required" }]}
        >
          <Input placeholder="e.g. Mirpur" />
        </Form.Item>

        <Form.Item
          name="branchDescription"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
