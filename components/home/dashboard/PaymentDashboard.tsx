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
import { PAYMENT_DATA, PaymentData } from "@/lib/home";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatAmount(value: number): string {
  const abs = Math.abs(value).toFixed(2);
  return value < 0 ? `-${abs}` : abs;
}

function ValueCell({ value }: { value: number }) {
  if (value < 0)
    return (
      <span className="font-mono text-sm font-semibold tabular-nums text-rose-400">
        {formatAmount(value)}
      </span>
    );
  if (value > 0)
    return (
      <span className="font-mono text-sm font-semibold tabular-nums text-emerald-400">
        {formatAmount(value)}
      </span>
    );
  return (
    <span className="font-mono text-sm font-medium tabular-nums text-slate-500">
      0.00
    </span>
  );
}

function TrendIcon({ value }: { value: number }) {
  if (value < 0) return <TrendingDown className="h-3.5 w-3.5 text-rose-400" />;
  if (value > 0) return <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />;
  return <Minus className="h-3.5 w-3.5 text-slate-600" />;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PaymentDashboard() {
  const [data, setData] = useState<PaymentData>(PAYMENT_DATA);
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = async () => {
    setSpinning(true);
    try {
    
      await new Promise((r) => setTimeout(r, 800));
      setData(PAYMENT_DATA);
    } finally {
      setSpinning(false);
    }
  };

  const { netProfitItems, netProfit, paymentSummaryItems, currency = "৳" } = data;
  const isLoss = netProfit < 0;
  const isGain = netProfit > 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* ── Net Profit Breakdown ── */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/40">
        <div className="border-b border-slate-800 px-5 py-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Net Profit Breakdown
          </p>
        </div>

        <ul className="flex-1 divide-y divide-slate-800/50 px-1 py-1">
          {netProfitItems.map((item, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-lg px-4 py-2.5 transition-colors hover:bg-slate-800/40"
            >
              <span className="text-sm text-slate-400">{item.label}</span>
              <ValueCell value={item.value} />
            </li>
          ))}
        </ul>

        {/* Net Profit Total */}
        <div className="mx-1 mb-1 flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/70 px-4 py-3.5">
          <div className="flex items-center gap-2">
            <TrendIcon value={netProfit} />
            <span className="text-sm font-bold text-slate-100">Net Profit</span>
          </div>
          <div className="flex items-center gap-2.5">
            {isLoss && (
              <span className="rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-rose-400">
                Loss
              </span>
            )}
            {isGain && (
              <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Gain
              </span>
            )}
            <span
              className={`font-mono text-base font-bold tabular-nums ${
                isLoss
                  ? "text-rose-400"
                  : isGain
                  ? "text-emerald-400"
                  : "text-slate-400"
              }`}
            >
              {formatAmount(netProfit)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 border-t border-slate-800 px-4 py-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <ClipboardList className="h-4 w-4" />
            View Order List
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={spinning}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-400 transition-all hover:border-slate-500 hover:text-slate-200 disabled:opacity-50 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <RefreshCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Payment Summary ── */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/40">
        <div className="border-b border-slate-800 px-5 py-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Payment Summary
          </p>
        </div>

        <ul className="flex-1 divide-y divide-slate-800/50 px-1 py-1">
          {paymentSummaryItems.map((item, i) => (
            <li
              key={i}
              className={`flex items-center justify-between rounded-lg px-4 py-2.5 transition-colors hover:bg-slate-800/40 ${
                item.highlight ? "bg-indigo-950/30" : ""
              }`}
            >
              <span
                className={`text-sm ${
                  item.highlight ? "font-semibold text-slate-200" : "text-slate-400"
                }`}
              >
                {item.label}
              </span>
              <ValueCell value={item.value} />
            </li>
          ))}
        </ul>

        <p className="border-t border-slate-800 px-5 py-3 text-xs leading-relaxed text-slate-600">
          Balance and withdrawal calculation deducts paid amounts and money
          reserved in open payment requests.
        </p>

        <div className="px-4 pb-4">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <CreditCard className="h-4 w-4" />
            Request Payment
          </button>
        </div>
      </div>
    </div>
  );
}