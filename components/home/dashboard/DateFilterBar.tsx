"use client";

import { DateFilter } from "@/lib/home";
import { useState } from "react";

export default function DateFilterBar() {
  const [filter, setFilter] = useState<DateFilter>({
    fromDate: "",
    toDate: "",
  });

  const handleReset = () => {
    setFilter({ fromDate: "", toDate: "" });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[180px] flex-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            From Date
          </label>
          <input
            type="date"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
            value={filter.fromDate}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, fromDate: e.target.value }))
            }
          />
        </div>

        <div className="min-w-[180px] flex-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            To Date
          </label>
          <input
            type="date"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
            value={filter.toDate}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, toDate: e.target.value }))
            }
          />
        </div>

        <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
          Load
        </button>
        <button
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
