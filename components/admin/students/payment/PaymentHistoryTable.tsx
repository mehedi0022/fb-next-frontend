"use client";

import { SellerPaymentHistoryItem } from "@/lib/admin/types";
import { Button, Card, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Printer } from "lucide-react";
import { SellerAccountSummaryResponse } from "@/lib/admin/types";

type Props = {
  data: SellerPaymentHistoryItem[];
  loading?: boolean;
  summary?: SellerAccountSummaryResponse["data"];
};

const printInvoice = (
  payment: SellerPaymentHistoryItem,
  summary?: SellerAccountSummaryResponse["data"],
) => {
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) return;

  const createdAt = dayjs(payment.createdAt).format("YYYY-MM-DD hh:mm A");
  const amount = `BDT ${Number(payment.amount).toLocaleString()}`;
  const logoUrl = `${window.location.origin}/assets/FB.png`;

  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice #${payment.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
          .header { margin-bottom: 20px; }
          .title { font-size: 22px; font-weight: 700; margin: 0 0 6px 0; }
          .muted { color: #6b7280; font-size: 13px; }
          .card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; }
          .row { display: flex; justify-content: space-between; margin: 8px 0; }
          .label { color: #6b7280; }
          .value { font-weight: 600; }
          .amount { font-size: 22px; font-weight: 700; margin-top: 12px; }
          .top-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px; }
          .company h2, .seller h2 { margin: 0 0 6px 0; font-size: 18px; }
          .company p, .seller p { margin: 2px 0; font-size: 13px; color: #4b5563; }
          .logo { width: 54px; height: 54px; object-fit: contain; margin-bottom: 8px; }
          .signatures { margin-top: 50px; display: flex; justify-content: space-between; gap: 20px; }
          .sig { width: 45%; text-align: center; }
          .sig-line { border-top: 1px solid #111827; margin-top: 36px; padding-top: 6px; font-size: 13px; color: #374151; }
        </style>
      </head>
      <body>
        <div class="top-row">
          <div class="company">
            <img src="${logoUrl}" alt="Company Logo" class="logo" />
            <h2>Node Master Service</h2>
            <p>Phone: +8801XXXXXXXXX</p>
            <p>Email: support@nodemasterservice.com</p>
            <p>Address: Dhaka, Bangladesh</p>
          </div>
          <div class="seller">
            <h2>Seller Information</h2>
            <p>Name: ${summary?.seller.name || "-"}</p>
            <p>Email: ${summary?.seller.email || "-"}</p>
            <p>Phone: ${summary?.seller.phone || "-"}</p>
            <p>Seller Code: ${summary?.seller.sellerCode || payment.userId}</p>
          </div>
        </div>
        <div class="header">
          <h1 class="title">Payment Invoice</h1>
          <p class="muted">Transaction ID: ${payment.transactionId || "-"}</p>
        </div>
        <div class="card">
          <div class="row"><span class="label">Invoice No</span><span class="value">#${payment.id}</span></div>
          <div class="row"><span class="label">Date</span><span class="value">${createdAt}</span></div>
          <div class="row"><span class="label">Method</span><span class="value">${payment.method}</span></div>
          <div class="row"><span class="label">Type</span><span class="value">${payment.type}</span></div>
          <div class="row"><span class="label">Status</span><span class="value">${payment.status}</span></div>
          <div class="row"><span class="label">Note</span><span class="value">${payment.note || "-"}</span></div>
          <div class="amount">Amount: ${amount}</div>
        </div>
        <div class="signatures">
          <div class="sig">
            <div class="sig-line">Receiver Signature</div>
          </div>
          <div class="sig">
            <div class="sig-line">Customer Signature</div>
          </div>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

const printFullInvoice = (
  payments: SellerPaymentHistoryItem[],
  summary?: SellerAccountSummaryResponse["data"],
) => {
  const printWindow = window.open("", "_blank", "width=1000,height=800");
  if (!printWindow) return;

  const totalPaid = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0,
  );
  const totalAmount = Number(summary?.totalAmount || 0);
  const dueAmount =
    summary?.due !== undefined
      ? Number(summary.due || 0)
      : Math.max(totalAmount - totalPaid, 0);

  const rows = payments
    .map(
      (payment, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${dayjs(payment.createdAt).format("YYYY-MM-DD hh:mm A")}</td>
        <td>${payment.method}</td>
        <td>${payment.type}</td>
        <td>${payment.transactionId || "-"}</td>
        <td>BDT ${Number(payment.amount).toLocaleString()}</td>
      </tr>
    `,
    )
    .join("");

  printWindow.document.write(`
    <html>
      <head>
        <title>Full Payment Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
          .header { margin-bottom: 20px; }
          .title { font-size: 22px; font-weight: 700; margin: 0 0 8px 0; }
          .subtitle { color: #6b7280; font-size: 13px; margin: 0; }
          .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 20px; }
          .card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; }
          .label { color: #6b7280; font-size: 12px; margin-bottom: 4px; }
          .value { font-size: 16px; font-weight: 700; }
          table { width: 100%; border-collapse: collapse; margin-top: 14px; }
          th, td { border: 1px solid #e5e7eb; padding: 8px; font-size: 12px; text-align: left; }
          th { background: #f8fafc; }
          .top-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px; }
          .company h2, .seller h2 { margin: 0 0 6px 0; font-size: 18px; }
          .company p, .seller p { margin: 2px 0; font-size: 13px; color: #4b5563; }
          .logo { width: 54px; height: 54px; object-fit: contain; margin-bottom: 8px; }
          .signatures { margin-top: 50px; display: flex; justify-content: space-between; gap: 20px; }
          .sig { width: 45%; text-align: center; }
          .sig-line { border-top: 1px solid #111827; margin-top: 36px; padding-top: 6px; font-size: 13px; color: #374151; }
        </style>
      </head>
      <body>
        <div class="top-row">
          <div class="company">
            <img src="${window.location.origin}/assets/FB.png" alt="Company Logo" class="logo" />
            <h2>Node Master Service</h2>
            <p>Phone: +8801XXXXXXXXX</p>
            <p>Email: support@nodemasterservice.com</p>
            <p>Address: Dhaka, Bangladesh</p>
          </div>
          <div class="seller">
            <h2>Seller Information</h2>
            <p>Name: ${summary?.seller.name || "-"}</p>
            <p>Email: ${summary?.seller.email || "-"}</p>
            <p>Phone: ${summary?.seller.phone || "-"}</p>
            <p>Seller Code: ${summary?.seller.sellerCode || "-"}</p>
          </div>
        </div>
        <div class="header">
          <h1 class="title">Full Payment Invoice</h1>
          <p class="subtitle">Generated: ${dayjs().format("YYYY-MM-DD hh:mm A")}</p>
          <p class="subtitle">Seller: ${summary?.seller.name || "-"}</p>
          <p class="subtitle">Seller Code: ${summary?.seller.sellerCode || "-"}</p>
        </div>
        <div class="grid">
          <div class="card"><div class="label">Package Amount</div><div class="value">BDT ${totalAmount.toLocaleString()}</div></div>
          <div class="card"><div class="label">Installments Count</div><div class="value">${payments.length}</div></div>
          <div class="card"><div class="label">Total Paid</div><div class="value">BDT ${totalPaid.toLocaleString()}</div></div>
          <div class="card"><div class="label">Current Due</div><div class="value">BDT ${dueAmount.toLocaleString()}</div></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Date</th>
              <th>Method</th>
              <th>Type</th>
              <th>Transaction ID</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${rows || '<tr><td colspan="6">No payment history found.</td></tr>'}
          </tbody>
        </table>
        <div class="signatures">
          <div class="sig">
            <div class="sig-line">Receiver Signature</div>
          </div>
          <div class="sig">
            <div class="sig-line">Customer Signature</div>
          </div>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

const buildColumns = (
  summary?: SellerAccountSummaryResponse["data"],
): ColumnsType<SellerPaymentHistoryItem> => [
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
  {
    title: "Invoice",
    align: "center",
    render: (_, record) => (
      <Button
        size="small"
        icon={<Printer size={14} />}
        onClick={() => printInvoice(record, summary)}
      >
        Print
      </Button>
    ),
  },
];

export default function PaymentHistoryTable({ data, loading, summary }: Props) {
  return (
    <Card title="Payment History" className="shadow-sm">
      <div className="mb-3 flex justify-end">
        <Button
          icon={<Printer size={14} />}
          onClick={() => printFullInvoice(data, summary)}
          disabled={data.length === 0}
        >
          Print Full Invoice
        </Button>
      </div>
      <Table<SellerPaymentHistoryItem>
        rowKey="id"
        columns={buildColumns(summary)}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 900 }}
      />
    </Card>
  );
}
