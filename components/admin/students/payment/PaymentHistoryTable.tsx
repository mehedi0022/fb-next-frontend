"use client";

import { SellerPaymentHistoryItem } from "@/lib/admin/types";
import { Card, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

type Props = {
  data: SellerPaymentHistoryItem[];
  loading?: boolean;
};

const columns: ColumnsType<SellerPaymentHistoryItem> = [
  {
    title: "Date",
    dataIndex: "createdAt",
    render: (value: string) => dayjs(value).format("YYYY-MM-DD hh:mm A"),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    render: (value: string) => `BDT ${Number(value).toLocaleString()}`,
  },
  { title: "Method", dataIndex: "method" },
  { title: "Type", dataIndex: "type" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <Tag color={status === "completed" ? "green" : "orange"}>{status}</Tag>
    ),
  },
  { title: "Trx ID", dataIndex: "transactionId" },
  { title: "Note", dataIndex: "note", render: (note: string) => note || "-" },
];

export default function PaymentHistoryTable({ data, loading }: Props) {
  return (
    <Card title="Payment History" className="shadow-sm">
      <Table<SellerPaymentHistoryItem>
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 900 }}
      />
    </Card>
  );
}
