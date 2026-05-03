"use client";

import { useMemo, useState } from "react";
import {
  Package,
  Filter,
  RotateCcw,
  ChevronDown,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
// ✅ Ant Design Pagination
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { PRODUCTS, ProductsTableItem } from "@/lib/home";

const CATEGORIES = [
  "All Categories",
  "Electronics",
  "Kitchen",
  "Tools",
  "Health",
];

const PAGE_SIZE = 8;

export default function MyProductsPage() {
  const [products, setProducts] = useState<ProductsTableItem[]>(PRODUCTS);
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleStatus = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p
      )
    );
  };

  const handleFilter = () => {
    setAppliedSearch(search);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setAppliedSearch("");
    setCategory("All Categories");
    setCurrentPage(1);
  };

  const { filtered, paginatedProducts } = useMemo(() => {
    const filtered = products.filter((p) => {
      const matchesSearch =
        !appliedSearch ||
        p.name.toLowerCase().includes(appliedSearch.toLowerCase());
      const matchesCategory =
        category === "All Categories" || p.category === category;
      return matchesSearch && matchesCategory;
    });

    const start = (currentPage - 1) * PAGE_SIZE;
    const paginatedProducts = filtered.slice(start, start + PAGE_SIZE);
    return { filtered, paginatedProducts };
  }, [products, appliedSearch, category, currentPage]);

  // ✅ Ant Design onChange type
  const onPageChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const inactiveProducts = products.filter((p) => p.status === "inactive").length;

  return (
    <div className="flex min-h-screen bg-slate-300 font-sans">
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 space-y-5">

          {/* Hero Banner + Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 rounded-2xl bg-emerald-800 p-8 flex flex-col justify-between min-h-[180px] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #fff 0%, transparent 60%)" }} />
              <div>
                <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-2">Your Dropship Catalog</p>
                <h2 className="text-white text-2xl font-bold leading-snug max-w-xs">Manage your storefront products</h2>
                <p className="text-emerald-200 text-sm mt-2 max-w-sm">Curate the products you want to sell, set your own price, and keep everything ready for orders.</p>
              </div>
              <div className="flex gap-3 mt-5">
                <button className="rounded-lg bg-white text-emerald-800 px-4 py-2 text-sm font-semibold hover:bg-emerald-50 transition-colors">Browse Products</button>
                <button className="rounded-lg border border-white text-white px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-colors">View Orders</button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4 flex-1">
                <p className="text-xs text-slate-500 font-medium">Total Products</p>
                <p className="text-4xl font-bold text-slate-800 mt-1">{totalProducts}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4">
                  <p className="text-xs text-slate-500 font-medium">Active</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-1">{activeProducts}</p>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4">
                  <p className="text-xs text-slate-500 font-medium">Inactive</p>
                  <p className="text-3xl font-bold text-slate-400 mt-1">{inactiveProducts}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800">Your Products</h2>
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-b border-slate-100 bg-slate-50">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Category</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
                    className="appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 cursor-pointer"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Search</label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleFilter()}
                  placeholder="Search by product name or SKU"
                  className="rounded-lg border border-slate-300 py-2 px-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                />
              </div>

              <div className="flex items-end gap-2 pt-4">
                <button onClick={handleFilter} className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition-all active:scale-[0.97]">
                  <Filter className="h-4 w-4" />Filter
                </button>
                <button onClick={handleReset} className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all active:scale-[0.97]">
                  <RotateCcw className="h-4 w-4" />Reset
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Product</th>
                    <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Previous Price</th>
                    <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Your Price</th>
                    <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Home</th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Added</th>
                    <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Link</th>
                    <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-5 py-3.5 text-slate-700 max-w-xs">{product.name}</td>
                        <td className="px-5 py-3.5 text-right font-mono text-slate-500">{product.previousPrice.toFixed(2)}</td>
                        <td className="px-5 py-3.5 text-right font-mono text-slate-700 font-medium">{product.yourPrice.toFixed(2)}</td>
                        <td className="px-5 py-3.5 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => toggleStatus(product.id)}>
                              {product.status === "active"
                                ? <ToggleRight className="h-8 w-8 text-emerald-500" />
                                : <ToggleLeft className="h-8 w-8 text-slate-300" />
                              }
                            </button>
                            <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${product.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                              {product.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-center text-slate-600">{product.home ? "Yes" : "No"}</td>
                        <td className="px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap">{product.added}</td>
                        <td className="px-5 py-3.5 text-center">
                          <button className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">View</button>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <button className="rounded-lg bg-rose-500 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-400 transition-colors">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Package className="h-10 w-10 text-slate-300" />
                          <p className="text-sm text-slate-400">No products found.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ✅ Ant Design Pagination */}
            {filtered.length > 0 && (
              <div className="flex justify-between items-center px-5 py-4 border-t border-slate-100 bg-slate-50 flex-wrap gap-3">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">{(currentPage - 1) * PAGE_SIZE + 1}</span>
                  {" "}to{" "}
                  <span className="font-semibold text-slate-700">{Math.min(currentPage * PAGE_SIZE, filtered.length)}</span>
                  {" "}of{" "}
                  <span className="font-semibold text-slate-700">{filtered.length}</span> products
                </p>
                <Pagination
                  current={currentPage}
                  total={filtered.length}
                  pageSize={PAGE_SIZE}
                  onChange={onPageChange}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}