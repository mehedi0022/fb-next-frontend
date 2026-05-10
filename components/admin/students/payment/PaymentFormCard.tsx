"use client";

import { Button, Card, Form, Input, InputNumber, Select } from "antd";

export type SellerPaymentFormValues = {
  amount: number;
  method: string;
  type: string;
  note?: string;
};

type Props = {
  loading?: boolean;
  onSubmit: (values: SellerPaymentFormValues) => void;
};

const methodOptions = [
  { label: "bKash", value: "bKash" },
  { label: "Nagad", value: "Nagad" },
  { label: "Rocket", value: "Rocket" },
  { label: "Bank", value: "Bank" },
  { label: "Cash", value: "Cash" },
];

const typeOptions = [
  { label: "Installment", value: "installment" },
  { label: "Full Payment", value: "full" },
];

export default function PaymentFormCard({ loading, onSubmit }: Props) {
  const [form] = Form.useForm<SellerPaymentFormValues>();

  const handleFinish = (values: SellerPaymentFormValues) => {
    onSubmit(values);
    form.resetFields(["amount", "method", "type", "note"]);
  };

  return (
    <Card title="Make Payment" className="shadow-sm">
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Amount is required" }]}
        >
          <InputNumber
            min={1}
            className="!w-full"
            size="large"
            placeholder="Enter amount"
          />
        </Form.Item>

        <Form.Item
          label="Method"
          name="method"
          rules={[{ required: true, message: "Method is required" }]}
        >
          <Select
            size="large"
            placeholder="Select method"
            options={methodOptions}
          />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Type is required" }]}
        >
          <Select size="large" placeholder="Select type" options={typeOptions} />
        </Form.Item>

        <Form.Item label="Note" name="note">
          <Input.TextArea rows={3} placeholder="Payment note" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Submit Payment
        </Button>
      </Form>
    </Card>
  );
}
