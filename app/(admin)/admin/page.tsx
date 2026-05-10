"use client";

import { useGetBatchesQuery } from "@/appstore/modules/batch/api";
import { useGetBranchesQuery } from "@/appstore/modules/branch/api";
import { useGetDashboardMetricsQuery } from "@/appstore/modules/dashboard/api";
import { Batch, Branch } from "@/lib/home";
import { Button, DatePicker, Select } from "antd";
import {
  BanknoteArrowDown,
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
};

function StatCard({ label, value, icon, theme, subtitle }: StatCardProps) {
  return (
    <div
      className={`relative rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${theme.bg} ${theme.border} ${theme.hover}`}>
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
  const [branchId, setBranchId] = useState<number | undefined>(undefined);
  const [batchId, setBatchId] = useState<number | undefined>(undefined);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

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
        <p className="mt-2 text-sm text-sky-50 font-medium">
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
    </div>
  );
}
