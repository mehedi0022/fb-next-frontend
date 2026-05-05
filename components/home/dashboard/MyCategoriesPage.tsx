"use client";

import { useMemo, useState } from "react";
import {
  LayoutGrid,
  Filter,
  RotateCcw,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { CATEGORY_DATA } from "@/lib/home";
import { Pagination, PaginationProps } from "antd";

export default function MyCategoriesPage() {
  const [categories, setCategories] = useState(CATEGORY_DATA);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 8;

  // ── Filter ─────────────────────────────────────
  const handleFilter = () => {
    setAppliedSearch(search);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setAppliedSearch("");
    setCurrentPage(1);
  };

  // ── Toggle Status ──────────────────────────────
  const toggleStatus = (id: number) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
            }
          : item
      )
    );
  };

  // ── Filtered Data ──────────────────────────────
  const filteredCategories = useMemo(() => {
    return categories.filter((item) =>
      item.category.toLowerCase().includes(appliedSearch.toLowerCase())
    );
  }, [categories, appliedSearch]);

  // ── Paginated Data ─────────────────────────────
  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCategories.slice(start, start + PAGE_SIZE);
  }, [filteredCategories, currentPage]);

  // ── Pagination Change ──────────────────────────
  const onPageChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  // ── Stats ──────────────────────────────────────
  const totalCategories = categories.length;
  const activeCategories = categories.filter(
    (item) => item.status === "active"
  ).length;

  const inactiveCategories = categories.filter(
    (item) => item.status === "inactive"
  ).length;

  return (
    <div className="min-h-screen bg-[#efefec] p-4 md:p-6">
      <div className="space-y-5">
        {/* ── Top Section ───────────────────────── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Hero Banner */}
          <div className="lg:col-span-2 rounded-3xl bg-gradient-to-r from-[#7b4a28] to-[#f07d2f] p-6 md:p-8 text-white relative overflow-hidden min-h-[190px] flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#27e0b3]">
                Your Store Categories
              </p>

              <h1 className="mt-2 text-3xl font-bold leading-tight max-w-md">
                Organize categories your way
              </h1>

              <p className="mt-3 text-sm text-white/90 max-w-md leading-relaxed">
                Pick the categories you want to show, reorder them, and add your
                own custom labels.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition">
                Browse Categories
              </button>

              <button className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition">
                Your Products
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#d8d8d4] bg-white p-5">
              <p className="text-xs text-slate-500">Total Categories</p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900">
                {totalCategories}
              </h2>
            </div>

            <div className="rounded-2xl border border-[#d8d8d4] bg-white p-5">
              <p className="text-xs text-slate-500">Active</p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900">
                {activeCategories}
              </h2>
            </div>

            <div className="rounded-2xl border border-[#d8d8d4] bg-white p-5">
              <p className="text-xs text-slate-500">Inactive</p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900">
                {inactiveCategories}
              </h2>
            </div>
          </div>
        </div>

        {/* ── Categories Table ───────────────────── */}
        <div className="rounded-3xl border border-[#d8d8d4] bg-white p-4 md:p-5">
          {/* Header */}
          <div className="mb-5">
            <h2 className="text-3xl font-bold text-slate-900">
              Your Categories
            </h2>
          </div>

          {/* Filter */}
          <div className="mb-5 flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
              <label className="text-sm font-medium text-slate-700">
                Search
              </label>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by category name or label"
                className="h-12 rounded-lg border border-[#f07d2f] px-4 text-sm outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <button
              onClick={handleFilter}
              className="h-12 rounded-lg bg-[#1d232a] px-7 text-sm font-semibold text-white hover:bg-black transition flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>

            <button
              onClick={handleReset}
              className="h-12 rounded-lg border border-slate-300 bg-[#f4f4f2] px-7 text-sm font-medium text-slate-700 hover:bg-slate-100 transition flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="border-b border-slate-200">
                  {[
                    "Category",
                    "Label",
                    "Sort",
                    "Status",
                    "Home",
                    "Added",
                    "Link",
                    "Action",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedCategories.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-3 py-3">
                      <div>
                        <p className="font-medium text-slate-800">
                          {item.category}
                        </p>

                        {item.subcategory && (
                          <p className="text-xs text-slate-500">
                            Subcategory: {item.subcategory}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-3 py-3 text-slate-700">{item.label}</td>

                    <td className="px-3 py-3 text-slate-700">{item.sort}</td>

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleStatus(item.id)}>
                          {item.status === "active" ? (
                            <ToggleRight className="h-9 w-9 text-emerald-500" />
                          ) : (
                            <ToggleLeft className="h-9 w-9 text-slate-300" />
                          )}
                        </button>

                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                            item.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-3 text-slate-700">
                      {item.home ? "Yes" : "No"}
                    </td>

                    <td className="px-3 py-3 text-slate-700">{item.added}</td>

                    <td className="px-3 py-3">
                      <button className="rounded border border-slate-400 px-4 py-1.5 text-xs font-medium hover:bg-slate-50">
                        View
                      </button>
                    </td>

                    <td className="px-3 py-3">
                      <button className="rounded border border-red-400 px-4 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredCategories.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <LayoutGrid className="h-10 w-10 text-slate-300" />
                        <p className="text-sm text-slate-400">
                          No categories found.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredCategories.length > 0 && (
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {(currentPage - 1) * PAGE_SIZE + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-slate-800">
                  {Math.min(currentPage * PAGE_SIZE, filteredCategories.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-800">
                  {filteredCategories.length}
                </span>{" "}
                categories
              </p>

              <Pagination
                current={currentPage}
                total={filteredCategories.length}
                pageSize={PAGE_SIZE}
                onChange={onPageChange}
                showSizeChanger={false}
                responsive
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}