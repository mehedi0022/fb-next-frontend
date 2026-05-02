"use client";

import {
  Search,
  Calendar,
  SlidersHorizontal,
  RotateCcw,
  PackageSearch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  OrderStatus,
  ORDERS,
} from "@/lib/home";
import { useOrderFilter } from "@/appstore/hooks/useOrderFilter";

// ─── Table Columns ────────────────────────────────────────────────────────────

const COLUMNS = [
  { key: "sn", label: "SN", align: "text-left" },
  { key: "orderDate", label: "Order Date", align: "text-left" },
  { key: "itemCount", label: "Item Count", align: "text-right" },
  { key: "cod", label: "COD", align: "text-right" },
  { key: "deliveryCharge", label: "Delivery Charge", align: "text-right" },
  { key: "packagingCharge", label: "Packaging Charge", align: "text-right" },
  { key: "wholesalePrice", label: "Wholesale Price", align: "text-right" },
  { key: "netProfit", label: "Net Profit", align: "text-right" },
  { key: "status", label: "Status", align: "text-center" },
  { key: "orderTracking", label: "Order Tracking", align: "text-left" },
] as const;

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  partial: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  untraceable: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

// ─── Input Styles ─────────────────────────────────────────────────────────────

const inputClass =
  "w-full rounded-xl border  py-2.5 pl-9 pr-3 text-sm  placeholder:text-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

// ─── Component ────────────────────────────────────────────────────────────────

export default function OrderList() {

  const { filters, filtered, handleChange, handleApply, handleReset } =
    useOrderFilter(ORDERS);

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-2xl border shadow-2xl shadow-black/50 bg-slate-300">

          {/* Info Banner */}
          <div className="border-b px-5 py-3">
            <p className="text-xs">
              Showing only orders that are still in{" "}
              <span className="font-semibold text-secondary">Pending</span> status.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-end gap-3 border-b px-5 py-4">
            <div className="flex flex-1 min-w-[200px] flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider ">
                Search
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 " />
                <input
                  name="search"
                  value={filters.search}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Order ID, invoice, tracking, phone..."
                />
              </div>
            </div>

            <div className="flex w-44 flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider ">
                From date
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 " />
                <input
                  name="fromDate"
                  type="date"
                  value={filters.fromDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex w-44 flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider ">
                To date
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
                <input
                  name="toDate"
                  type="date"
                  value={filters.toDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pb-0.5">
              <button
                type="button"
                onClick={handleApply}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Apply filters
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 rounded-xl border  px-4 py-2.5 text-sm font-medium transition-all active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b bg-slate-400">
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={`whitespace-nowrap px-4 py-3 text-[11px] font-bold uppercase tracking-widest ${col.align}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.length > 0 ? (
                  filtered.map((order) => (
                    <tr key={String(order.sn)} className="transition-colors ">
                      <td className="px-4 py-3 ">{order.sn}</td>
                      <td className="whitespace-nowrap px-4 py-3 ">{order.orderDate}</td>
                      <td className="px-4 py-3 text-right ">{order.itemCount}</td>
                      <td className="px-4 py-3 text-right font-mono ">{order.cod.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-mono ">{order.deliveryCharge.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-mono ">{order.packagingCharge.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-mono ">{order.wholesalePrice.toFixed(2)}</td>
                      <td
                        className={`px-4 py-3 text-right font-mono font-semibold ${order.netProfit < 0
                            ? "text-rose-400"
                            : order.netProfit > 0
                              ? "text-emerald-400"
                              : ""
                          }`}
                      >
                        {order.netProfit.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <StatusBadge status={order.status as OrderStatus} />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-indigo-400">
                        {order.orderTracking}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={COLUMNS.length} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <PackageSearch className="h-10 w-10" />
                        <p className="text-sm">No pending orders found yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t  px-5 py-3">
            <p className="text-xs ">
              {filtered.length} order{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="flex items-center gap-1">
              <button className="rounded-lg border  p-1.5  transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="rounded-lg border  p-1.5  transition-color">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}