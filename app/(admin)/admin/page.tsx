"use client";

import { useGetBatchesQuery } from "@/appstore/modules/batch/api";
import { useGetBranchesQuery } from "@/appstore/modules/branch/api";
import {
  useGetDashboardMetricsQuery,
  useGetProductMetricsQuery,
} from "@/appstore/modules/dashboard/api";
import { Batch, Branch } from "@/lib/home";
import { Button, DatePicker, Select } from "antd";
import {
  BanknoteArrowDown,
  Boxes,
  Eye,
  FileEdit,
  ListTree,
  PackageSearch,
  PackageX,
  RefreshCw,
  ShieldAlert,
  ShoppingBag,
  TrendingUp,
  CircleDollarSign,
  Clock3,
  RotateCcw,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;

type ThemeClasses = {
  bg: string;
  border: string;
  hover: string;
  text: string;
  label: string;
  iconBg: string;
  iconColor: string;
};

type StatCardProps = {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  theme: ThemeClasses;
  subtitle?: string;
  onClick?: () => void;
};

function StatCard({
  label,
  value,
  icon,
  theme,
  subtitle,
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${theme.bg} ${theme.border} ${theme.hover} ${onClick ? "cursor-pointer" : ""}`}>
      <div className="mb-4 flex items-center justify-between">
        <p
          className={`text-xs font-bold uppercase tracking-wider ${theme.label}`}>
          {label}
        </p>
        <div
          className={`rounded-xl p-2.5 shadow-sm ${theme.iconBg} ${theme.iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <h3 className={`text-3xl font-extrabold tracking-tight ${theme.text}`}>
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs font-medium text-slate-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

const currencyFormat = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

export default function AdminDashboardPage() {
  const router = useRouter();
  const [branchId, setBranchId] = useState<number | undefined>(undefined);
  const [batchId, setBatchId] = useState<number | undefined>(undefined);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [productLowStockThreshold, setProductLowStockThreshold] =
    useState<number>(10);
  const [productTopLimit, setProductTopLimit] = useState<number>(5);
  const [arrivalWindowDays, setArrivalWindowDays] = useState<7 | 30>(7);

  const { data: branchResponse } = useGetBranchesQuery();
  const { data: batchResponse } = useGetBatchesQuery();

  const filteredBatches = useMemo(() => {
    const list = batchResponse?.data ?? [];
    if (!branchId) return [];
    return list.filter((item: Batch) => item.branchId === branchId);
  }, [batchResponse?.data, branchId]);

  const queryParams = useMemo(
    () => ({
      branchId,
      batchId,
      dateFrom: dateRange?.[0]?.format("YYYY-MM-DD") || undefined,
      dateTo: dateRange?.[1]?.format("YYYY-MM-DD") || undefined,
    }),
    [branchId, batchId, dateRange],
  );

  const { data, isLoading, isError } = useGetDashboardMetricsQuery(queryParams);
  const {
    data: productMetricsResponse,
    isLoading: productMetricsLoading,
    isError: productMetricsError,
  } = useGetProductMetricsQuery({
    lowStockThreshold: productLowStockThreshold,
    topLimit: productTopLimit,
  });

  const goToAllProducts = (params?: Record<string, string | number>) => {
    const qs = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        qs.set(key, String(value)),
      );
    }
    router.push(`/admin/products/all${qs.toString() ? `?${qs.toString()}` : ""}`);
  };

  const resetFilters = () => {
    setBranchId(undefined);
    setBatchId(undefined);
    setDateRange(null);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
          />
        ))}
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load dashboard metrics
        </h2>
        <p className="mt-1 text-sm text-red-600">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  const metrics = data.data;

  // Pre-defined themes for each card to ensure perfect contrast and clean gradients
  const themes = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50/80 to-blue-100/30",
      border: "border-blue-100",
      hover: "hover:border-blue-300 hover:shadow-blue-100/50",
      text: "text-blue-950",
      label: "text-blue-600/90",
      iconBg: "bg-white",
      iconColor: "text-blue-600",
    },
    amber: {
      bg: "bg-gradient-to-br from-amber-50/80 to-orange-100/30",
      border: "border-amber-100",
      hover: "hover:border-amber-300 hover:shadow-amber-100/50",
      text: "text-amber-950",
      label: "text-amber-700/90",
      iconBg: "bg-white",
      iconColor: "text-amber-600",
    },
    emerald: {
      bg: "bg-gradient-to-br from-emerald-50/80 to-teal-100/30",
      border: "border-emerald-100",
      hover: "hover:border-emerald-300 hover:shadow-emerald-100/50",
      text: "text-emerald-950",
      label: "text-emerald-700/90",
      iconBg: "bg-white",
      iconColor: "text-emerald-600",
    },
    rose: {
      bg: "bg-gradient-to-br from-rose-50/80 to-red-100/30",
      border: "border-rose-100",
      hover: "hover:border-rose-300 hover:shadow-rose-100/50",
      text: "text-rose-950",
      label: "text-rose-700/90",
      iconBg: "bg-white",
      iconColor: "text-rose-600",
    },
    violet: {
      bg: "bg-gradient-to-br from-violet-50/80 to-purple-100/30",
      border: "border-violet-100",
      hover: "hover:border-violet-300 hover:shadow-violet-100/50",
      text: "text-violet-950",
      label: "text-violet-700/90",
      iconBg: "bg-white",
      iconColor: "text-violet-600",
    },
    cyan: {
      bg: "bg-gradient-to-br from-cyan-50/80 to-sky-100/30",
      border: "border-cyan-100",
      hover: "hover:border-cyan-300 hover:shadow-cyan-100/50",
      text: "text-cyan-950",
      label: "text-cyan-700/90",
      iconBg: "bg-white",
      iconColor: "text-cyan-600",
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-50/80 to-amber-100/30",
      border: "border-orange-100",
      hover: "hover:border-orange-300 hover:shadow-orange-100/50",
      text: "text-orange-950",
      label: "text-orange-700/90",
      iconBg: "bg-white",
      iconColor: "text-orange-600",
    },
    indigo: {
      bg: "bg-gradient-to-br from-indigo-50/80 to-blue-100/30",
      border: "border-indigo-100",
      hover: "hover:border-indigo-300 hover:shadow-indigo-100/50",
      text: "text-indigo-950",
      label: "text-indigo-700/90",
      iconBg: "bg-white",
      iconColor: "text-indigo-600",
    },
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Filters Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">Filter Metrics</h2>
          <Button
            onClick={resetFilters}
            icon={<RotateCcw size={14} />}
            className="flex items-center gap-1 border-slate-300 font-medium text-slate-600 transition-all hover:border-slate-400 hover:text-slate-900">
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Branch
            </label>
            <Select
              value={branchId}
              onChange={(value) => {
                setBranchId(value);
                setBatchId(undefined);
              }}
              placeholder="All Branches"
              allowClear
              className="w-full"
              size="large"
              options={(branchResponse?.branches ?? []).map(
                (branch: Branch) => ({
                  value: branch.id,
                  label: branch.branchName,
                }),
              )}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Batch
            </label>
            <Select
              value={batchId}
              onChange={(value) => setBatchId(value)}
              placeholder={branchId ? "All Batches" : "Select branch first"}
              allowClear
              disabled={!branchId}
              className="w-full"
              size="large"
              options={filteredBatches.map((batch: Batch) => ({
                value: batch.id,
                label: batch.batchName,
              }))}
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Date Range
            </label>
            <RangePicker
              value={dateRange}
              onChange={(dates) => {
                if (!dates) {
                  setDateRange(null);
                  return;
                }
                setDateRange(dates);
              }}
              className="w-full"
              size="large"
              format="YYYY-MM-DD"
            />
          </div>
        </div>
      </div>

      {/* Restored Original Banner */}
      <div className="rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-600 to-cyan-500 p-6 text-white shadow-md">
        <p className="text-sm font-semibold tracking-wide text-sky-100 uppercase">
          Admin Dashboard
        </p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
          Overview & Collection Metrics
        </h1>
        <p className="max-w-lg mt-2 text-sm text-sky-50 font-medium">
          Track performance, monitor collections, and gain real-time insights
          into your business growth.
        </p>
      </div>

      {/* Light Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Seller"
          value={metrics.totalUsers}
          icon={<Users className="h-5 w-5" />}
          theme={themes.blue}
        />
        <StatCard
          label="Pending Seller"
          value={metrics.totalPendingUsers}
          icon={<Clock3 className="h-5 w-5" />}
          theme={themes.amber}
        />
        <StatCard
          label="Registered Seller"
          value={metrics.totalRegisteredUsers}
          icon={<UserCheck className="h-5 w-5" />}
          theme={themes.emerald}
        />
        <StatCard
          label="Rejected Seller"
          value={metrics.totalRejectedUsers}
          icon={<UserMinus className="h-5 w-5" />}
          theme={themes.rose}
        />
        <StatCard
          label="Today Registered"
          value={metrics.todayRegisteredUsers}
          icon={<UserPlus className="h-5 w-5" />}
          theme={themes.violet}
        />
        <StatCard
          label="Total Payment"
          value={currencyFormat(metrics.totalPayment)}
          icon={<CircleDollarSign className="h-5 w-5" />}
          theme={themes.cyan}
        />
        <StatCard
          label="Total Due"
          value={currencyFormat(metrics.totalDue)}
          icon={<BanknoteArrowDown className="h-5 w-5" />}
          theme={themes.orange}
        />
        <StatCard
          label="Today Collection"
          value={currencyFormat(metrics.todayCollection)}
          icon={<WalletCards className="h-5 w-5" />}
          theme={themes.indigo}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Product Metrics
            </h2>
            <p className="text-xs text-slate-500">
              Real-time product inventory and catalog insights
            </p>
          </div>
        </div>
        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Low Stock Threshold
            </label>
            <Select
              value={productLowStockThreshold}
              onChange={(value) => setProductLowStockThreshold(value)}
              className="w-full"
              size="large"
              options={[5, 10, 20, 50].map((value) => ({
                value,
                label: `< ${value}`,
              }))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Top List Limit
            </label>
            <Select
              value={productTopLimit}
              onChange={(value) => setProductTopLimit(value)}
              className="w-full"
              size="large"
              options={[3, 5, 10].map((value) => ({
                value,
                label: `Top ${value}`,
              }))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
              New Arrival Window
            </label>
            <Select
              value={arrivalWindowDays}
              onChange={(value) => setArrivalWindowDays(value)}
              className="w-full"
              size="large"
              options={[
                { value: 7, label: "Last 7 days" },
                { value: 30, label: "Last 30 days" },
              ]}
            />
          </div>
        </div>

        {productMetricsLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl border border-slate-200 bg-slate-50"
              />
            ))}
          </div>
        ) : productMetricsError || !productMetricsResponse?.success ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Failed to load product metrics.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <StatCard
                label="Total Products"
                value={productMetricsResponse.data.totalProducts}
                icon={<Boxes className="h-5 w-5" />}
                theme={themes.blue}
                onClick={() => goToAllProducts()}
              />
              <StatCard
                label={`New Arrivals (${arrivalWindowDays}d)`}
                value={
                  arrivalWindowDays === 7
                    ? productMetricsResponse.data.newArrivals.last7Days
                    : productMetricsResponse.data.newArrivals.last30Days
                }
                icon={<ShoppingBag className="h-5 w-5" />}
                theme={themes.emerald}
                subtitle={`30d: ${productMetricsResponse.data.newArrivals.last30Days}`}
                onClick={() =>
                  goToAllProducts({
                    metric: "new-arrivals",
                    days: arrivalWindowDays,
                  })
                }
              />
              <StatCard
                label="Low Stock"
                value={productMetricsResponse.data.lowStockWarning.count}
                icon={<ShieldAlert className="h-5 w-5" />}
                theme={themes.amber}
                subtitle={`Threshold < ${productMetricsResponse.data.lowStockWarning.threshold}`}
                onClick={() =>
                  goToAllProducts({
                    metric: "low-stock",
                    threshold: productMetricsResponse.data.lowStockWarning
                      .threshold,
                  })
                }
              />
              <StatCard
                label="Out of Stock"
                value={productMetricsResponse.data.outOfStock}
                icon={<PackageX className="h-5 w-5" />}
                theme={themes.rose}
                onClick={() => goToAllProducts({ metric: "out-of-stock" })}
              />
              <StatCard
                label="Total Categories"
                value={productMetricsResponse.data.totalCategories}
                icon={<ListTree className="h-5 w-5" />}
                theme={themes.violet}
                onClick={() => goToAllProducts()}
              />
              <StatCard
                label="Draft / Unpublished"
                value={productMetricsResponse.data.draftOrUnpublished}
                icon={<FileEdit className="h-5 w-5" />}
                theme={themes.orange}
                onClick={() => goToAllProducts({ metric: "draft", isActive: "false" })}
              />
              <StatCard
                label="Recently Updated"
                value={productMetricsResponse.data.recentlyUpdatedProducts}
                icon={<RefreshCw className="h-5 w-5" />}
                theme={themes.cyan}
              />
              <StatCard
                label="Highest Price"
                value={
                  productMetricsResponse.data.priceRangeOverview.highest
                    ? currencyFormat(
                        productMetricsResponse.data.priceRangeOverview.highest
                          .price,
                      )
                    : "-"
                }
                icon={<TrendingUp className="h-5 w-5" />}
                theme={themes.indigo}
              />
              <StatCard
                label="Lowest Price"
                value={
                  productMetricsResponse.data.priceRangeOverview.lowest
                    ? currencyFormat(
                        productMetricsResponse.data.priceRangeOverview.lowest
                          .price,
                      )
                    : "-"
                }
                icon={<PackageSearch className="h-5 w-5" />}
                theme={themes.blue}
              />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  Top Selling Products
                </h3>
                <div className="space-y-2">
                  {productMetricsResponse.data.topSellingProducts.length ? (
                    productMetricsResponse.data.topSellingProducts.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                        <p className="truncate text-sm font-medium text-slate-700">
                          <button
                            onClick={() => goToAllProducts({ search: item.name })}
                            className="text-left hover:text-sky-700">
                            {item.name}
                          </button>
                        </p>
                        <span className="text-xs font-semibold text-emerald-700">
                          Score: {item.score}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500">No data found.</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
                  <Eye className="h-4 w-4 text-cyan-600" />
                  Most Viewed Products
                </h3>
                <div className="space-y-2">
                  {productMetricsResponse.data.mostViewedProducts.length ? (
                    productMetricsResponse.data.mostViewedProducts.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                        <p className="truncate text-sm font-medium text-slate-700">
                          <button
                            onClick={() => goToAllProducts({ search: item.name })}
                            className="text-left hover:text-sky-700">
                            {item.name}
                          </button>
                        </p>
                        <span className="text-xs font-semibold text-cyan-700">
                          Score: {item.score}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500">No data found.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
