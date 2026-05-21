"use client";

import { useState } from "react";
import {
  RefreshCw,
  ClipboardList,
  CreditCard,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";
import { useGetSellerOrderSummaryQuery } from "@/appstore/modules/orders/api";

function formatAmount(value: number): string {
  const abs = Math.abs(value).toFixed(2);
  return value < 0 ? `-${abs}` : abs;
}

function ValueCell({ value }: { value: number }) {
  if (value < 0) return <span className="font-mono text-sm font-semibold text-rose-600">{formatAmount(value)}</span>;
  if (value > 0) return <span className="font-mono text-sm font-semibold text-emerald-600">{formatAmount(value)}</span>;
  return <span className="font-mono text-sm font-medium text-slate-500">0.00</span>;
}

function TrendIcon({ value }: { value: number }) {
  if (value < 0) return <TrendingDown className="h-3.5 w-3.5 text-rose-600" />;
  if (value > 0) return <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />;
  return <Minus className="h-3.5 w-3.5 text-slate-500" />;
}

export default function PaymentDashboard() {
  const { data: summaryData, refetch } = useGetSellerOrderSummaryQuery();
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = async () => {
    setSpinning(true);
    try {
      await refetch();
    } finally {
      setSpinning(false);
    }
  };

  const amounts = summaryData?.data?.amounts;
  const profit = Number(amounts?.totalProfit ?? 0);
  const totalGrand = Number(amounts?.totalGrand ?? 0);
  const wholesale = Number(amounts?.totalWholesale ?? 0);
  const delivery = Number(amounts?.totalDeliveryCharge ?? 0);
  const packaging = Number(amounts?.totalPackagingCharge ?? 0);
  const cod = Number(amounts?.totalCodCharge ?? 0);

  const netProfitItems = [
    { label: "Total Sales", value: totalGrand },
    { label: "Wholesale Cost (-)", value: -wholesale },
    { label: "Delivery Charge (-)", value: -delivery },
    { label: "Packaging Charge (-)", value: -packaging },
    { label: "COD Charge (-)", value: -cod },
  ];

  const paymentSummaryItems = [
    { label: "Net Profit", value: profit, highlight: true },
    { label: "Gross Sales", value: totalGrand },
    { label: "Total Cost", value: wholesale + delivery + packaging + cod },
  ];

  const netProfit = profit;
  const isLoss = netProfit < 0;
  const isGain = netProfit > 0;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Net Profit Breakdown</p>
        </div>

        <ul className="divide-y divide-slate-100 px-1 py-1">
          {netProfitItems.map((item, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg px-4 py-2.5 transition hover:bg-slate-50">
              <span className="text-sm text-slate-600">{item.label}</span>
              <ValueCell value={item.value} />
            </li>
          ))}
        </ul>

        <div className="mx-2 mb-2 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
          <div className="flex items-center gap-2">
            <TrendIcon value={netProfit} />
            <span className="text-sm font-bold text-slate-900">Net Profit</span>
          </div>
          <div className="flex items-center gap-2.5">
            {isLoss && <span className="rounded-md bg-rose-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-rose-700">Loss</span>}
            {isGain && <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700">Gain</span>}
            <span className={`font-mono text-base font-bold ${isLoss ? "text-rose-700" : isGain ? "text-emerald-700" : "text-slate-600"}`}>
              {formatAmount(netProfit)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-t border-slate-100 px-4 py-4">
          <button type="button" className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
            <ClipboardList className="h-4 w-4" />
            View Order List
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={spinning}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Payment Summary</p>
        </div>

        <ul className="divide-y divide-slate-100 px-1 py-1">
          {paymentSummaryItems.map((item, i) => (
            <li key={i} className={`flex items-center justify-between rounded-lg px-4 py-2.5 transition hover:bg-slate-50 ${item.highlight ? "bg-slate-50" : ""}`}>
              <span className={`text-sm ${item.highlight ? "font-semibold text-slate-900" : "text-slate-600"}`}>{item.label}</span>
              <ValueCell value={item.value} />
            </li>
          ))}
        </ul>

        <p className="border-t border-slate-100 px-5 py-3 text-xs leading-relaxed text-slate-500">
          Balance and withdrawal calculation deducts paid amounts and money reserved in open payment requests.
        </p>

        <div className="px-4 pb-4">
          <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
            <CreditCard className="h-4 w-4" />
            Request Payment
          </button>
        </div>
      </div>
    </div>
  );
}
