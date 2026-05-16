"use client";

import { useState, useMemo, ChangeEvent } from "react";
import { Search, Calendar, RotateCcw, PackageSearch, ExternalLink } from "lucide-react";
import { UntrackedOrderStatus, UNTRACKED_ORDERS } from "@/lib/home";

// ─── Constants ────────────────────────────────────────────────────────────────

const COLUMNS = [
  { key: "sl",       label: "SL",       align: "text-left"  },
  { key: "orderId",  label: "Order ID", align: "text-left"  },
  { key: "customer", label: "Customer", align: "text-left"  },
  { key: "phone",    label: "Phone",    align: "text-left"  },
  { key: "items",    label: "Items",    align: "text-center"},
  { key: "status",   label: "Status",   align: "text-left"  },
  { key: "action",   label: "Action",   align: "text-left"  },
] as const;

const STATUS_STYLES: Record<UntrackedOrderStatus, string> = {
  cancelled: "bg-amber-400 text-white",
  pending:   "bg-slate-900 text-white",
  delivered: "bg-emerald-500 text-white",
};

const STATUS_LABELS: Record<UntrackedOrderStatus, string> = {
  cancelled: "Cancelled",
  pending:   "Pending",
  delivered: "Delivered",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: UntrackedOrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

// ─── Filters interface ────────────────────────────────────────────────────────

interface UntrackedFilters {
  search: string;
  fromDate: string;
  toDate: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function UntrackedOrdersPage() {
  const [filters, setFilters] = useState<UntrackedFilters>({
    search: "",
    fromDate: "",
    toDate: "",
  });
  const [applied, setApplied] = useState<UntrackedFilters>(filters);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => setApplied({ ...filters });

  const handleReset = () => {
    const empty: UntrackedFilters = { search: "", fromDate: "", toDate: "" };
    setFilters(empty);
    setApplied({ ...empty });
  };

  const { search } = applied;

  const filtered = useMemo(() => {
    return UNTRACKED_ORDERS.filter((order) => {
      const q = search.toLowerCase();
      return (
        !q ||
        order.orderId.toLowerCase().includes(q) ||
        order.customer.toLowerCase().includes(q) ||
        order.phone.includes(q)
      );
    });
  }, [search]);

  return (
    <div className="">
      <div className="">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}
          <div className="border-b px-6 py-5">
            <h1 className="text-xl font-bold text-slate-800">Untracked Orders</h1>
            <p className="mt-0.5 text-sm text-slate-500">Orders not sent to courier yet.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 border-b px-6 py-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Search by ID / Phone / Name..."
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            {/* From Date */}
            <div className="relative w-44">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                name="fromDate"
                type="date"
                value={filters.fromDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            {/* To Date */}
            <div className="relative w-44">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                name="toDate"
                type="date"
                value={filters.toDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            {/* Buttons */}
            <button
              type="button"
              onClick={handleSearch}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.97]"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 active:scale-[0.97]"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={`px-6 py-3 text-xs font-bold uppercase tracking-wider  ${col.align}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length > 0 ? (
                  filtered.map((order) => (
                    <tr key={order.orderId} className="transition-colors hover:bg-slate-50/60">
                      <td className="px-6 py-3.5 text-slate-500">{order.sl}</td>
                      <td className="px-6 py-3.5 font-semibold text-slate-700">{order.orderId}</td>
                      <td className="px-6 py-3.5 text-slate-700">{order.customer}</td>
                      <td className="px-6 py-3.5 font-mono text-slate-600">{order.phone}</td>
                      <td className="px-6 py-3.5 text-center text-slate-700">{order.items}</td>
                      <td className="px-6 py-3.5">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-3.5">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.97]"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Product Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={COLUMNS.length} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <PackageSearch className="h-10 w-10 text-slate-400" />
                        <p className="text-sm text-slate-400">No untracked orders found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
