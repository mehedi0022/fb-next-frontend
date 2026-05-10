"use client";

import { SellerAccountSummaryResponse } from "@/lib/admin/types";
import { Card } from "antd";

type Props = {
  summary?: SellerAccountSummaryResponse["data"];
};

const toCurrency = (amount: number | string) =>
  `BDT ${Number(amount || 0).toLocaleString()}`;

export default function AccountSummaryCard({ summary }: Props) {
  if (!summary) return null;

  return (
    <Card title="Seller Account Summary" className="shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <p className="text-xs text-slate-500">Seller Name</p>
          <p className="text-sm font-semibold text-slate-800">{summary.seller.name}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Seller Code</p>
          <p className="text-sm font-semibold text-slate-800">{summary.seller.sellerCode}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Email</p>
          <p className="text-sm font-semibold text-slate-800">{summary.seller.email}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Phone</p>
          <p className="text-sm font-semibold text-slate-800">{summary.seller.phone}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Total Amount</p>
          <p className="text-lg font-bold text-slate-900">{toCurrency(summary.totalAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Total Paid</p>
          <p className="text-lg font-bold text-emerald-600">{toCurrency(summary.totalPaid)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Due</p>
          <p className="text-lg font-bold text-rose-600">{toCurrency(summary.due)}</p>
        </div>
      </div>
    </Card>
  );
}
