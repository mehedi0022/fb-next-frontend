"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import {
  Search,
  Calendar,
  SlidersHorizontal,
  RotateCcw,
  PackageSearch,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { AllOrderStatus } from "@/lib/home";
import { useGetSellerOrdersQuery } from "@/appstore/modules/orders/api";

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
  { key: "action", label: "Action", align: "text-center" },
] as const;

const STATUS_STYLES: Record<AllOrderStatus, string> = {
  in_transit: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  in_review: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  delivered: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  cancelled: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  returned: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const STATUS_LABELS: Record<AllOrderStatus, string> = {
  in_transit: "In Transit",
  in_review: "In Review",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

const inputClass =
  "w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

const PAGE_SIZE = 10;

const statusMap: Record<string, AllOrderStatus> = {
  shipped: "in_transit",
  delivered: "delivered",
  cancelled: "cancelled",
  returned: "returned",
  pending: "in_review",
  confirmed: "in_review",
  packed: "in_review",
};

function StatusBadge({ status }: { status: AllOrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type FilterState = {
  search: string;
  fromDate: string;
  toDate: string;
};

export default function AllOrdersPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    fromDate: "",
    toDate: "",
  });
  const [applied, setApplied] = useState<FilterState>({
    search: "",
    fromDate: "",
    toDate: "",
  });

  const { data, isFetching } = useGetSellerOrdersQuery({
    page,
    limit: PAGE_SIZE,
    search: applied.search || undefined,
    dateFrom: applied.fromDate || undefined,
    dateTo: applied.toDate || undefined,
  });

  const rows = useMemo(
    () =>
      (data?.data ?? []).map((order, index) => ({
        id: order.id,
        sn: (page - 1) * PAGE_SIZE + index + 1,
        orderDate: order.createdAt,
        itemCount: order.items?.length ?? 0,
        cod: Number(order.grandTotal ?? 0),
        deliveryCharge: Number(order.deliveryCharge ?? 0),
        packagingCharge: Number(order.packagingCharge ?? 0),
        wholesalePrice: Number(order.wholesaleTotal ?? 0),
        netProfit: Number(order.grossProfit ?? 0),
        status: statusMap[order.status] ?? "in_review",
        orderTracking: order.trackingNo,
      })),
    [data?.data, page],
  );

  const total = data?.meta?.total ?? 0;
  const totalPages = Math.max(1, data?.meta?.totalPages ?? 1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApply = () => {
    setApplied(filters);
    setPage(1);
  };

  const handleReset = () => {
    const empty = { search: "", fromDate: "", toDate: "" };
    setFilters(empty);
    setApplied(empty);
    setPage(1);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b px-5 py-3">
        <p className="text-xs">Browse every order from your store in one place.</p>
      </div>

      <div className="flex flex-wrap items-end gap-3 border-b px-5 py-4">
        <div className="flex min-w-[200px] flex-1 flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider">Search</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
            <input
              name="search"
              value={filters.search}
              onChange={handleChange}
              className={inputClass + " border-slate-200 bg-slate-50 text-slate-700"}
              placeholder="Order no, customer, phone, tracking..."
            />
          </div>
        </div>

        <div className="flex w-44 flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider">From date</label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
            <input
              name="fromDate"
              type="date"
              value={filters.fromDate}
              onChange={handleChange}
              className={inputClass + " border-slate-200 bg-slate-50 text-slate-700"}
            />
          </div>
        </div>

        <div className="flex w-44 flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider">To date</label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
            <input
              name="toDate"
              type="date"
              value={filters.toDate}
              onChange={handleChange}
              className={inputClass + " border-slate-200 bg-slate-50 text-slate-700"}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pb-0.5">
          <button
            type="button"
            onClick={handleApply}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-700"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Apply filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
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
            {rows.length > 0 ? (
              rows.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3">{order.sn}</td>
                  <td className="whitespace-nowrap px-4 py-3">{formatDate(order.orderDate)}</td>
                  <td className="px-4 py-3 text-right">{order.itemCount}</td>
                  <td className="px-4 py-3 text-right font-mono">
                    {order.cod.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">{order.deliveryCharge.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-mono">{order.packagingCharge.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-mono">{order.wholesalePrice.toFixed(2)}</td>
                  <td
                    className={`px-4 py-3 text-right font-mono font-semibold ${
                      order.netProfit < 0
                        ? "text-rose-600"
                        : order.netProfit > 0
                          ? "text-emerald-600"
                          : ""
                    }`}
                  >
                    {order.netProfit.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{order.orderTracking ?? "-"}</td>
                  <td className="px-4 py-3 text-center">
                    {order.orderTracking ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-slate-700"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Track Order
                      </button>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={COLUMNS.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <PackageSearch className="h-10 w-10" />
                    <p className="text-sm">
                      {isFetching ? "Loading orders..." : "No orders found."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t px-5 py-3">
        <p className="text-xs">
          Showing <span className="font-medium">{rows.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}-{(page - 1) * PAGE_SIZE + rows.length}</span> of{" "}
          <span className="font-medium">{total}</span> orders
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isFetching}
            className="rounded-lg border p-1.5 transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || isFetching}
            className="rounded-lg border p-1.5 transition-colors disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
