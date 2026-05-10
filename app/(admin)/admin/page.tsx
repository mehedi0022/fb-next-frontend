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
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

type StatCardProps = {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent: string;
  subtitle?: string;
};

function StatCard({ label, value, icon, accent, subtitle }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <span className={`rounded-lg p-2 ${accent}`}>{icon}</span>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      {subtitle ? (
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      ) : null}
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
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(
    null,
  );

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
            className="h-32 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
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

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">
            Filter Metrics
          </h2>
          <Button size="small" onClick={resetFilters}>
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Branch</label>
            <Select
              value={branchId}
              onChange={(value) => {
                setBranchId(value);
                setBatchId(undefined);
              }}
              placeholder="All Branches"
              allowClear
              className="w-full"
              options={(branchResponse?.branches ?? []).map((branch: Branch) => ({
                value: branch.id,
                label: branch.branchName,
              }))}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Batch</label>
            <Select
              value={batchId}
              onChange={(value) => setBatchId(value)}
              placeholder={branchId ? "All Batches" : "Select branch first"}
              allowClear
              disabled={!branchId}
              className="w-full"
              options={filteredBatches.map((batch: Batch) => ({
                value: batch.id,
                label: batch.batchName,
              }))}
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-medium text-slate-500">Date Range</label>
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
              format="YYYY-MM-DD"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-sky-600 to-cyan-500 p-6 text-white shadow-sm">
        <p className="text-sm font-medium text-sky-100">Admin Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold">
          Overview & Collection Metrics
        </h1>
        <p className="mt-2 text-sm text-sky-100">
          Track performance, monitor collections, and gain real-time insights
          into your business growth.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Seller"
          value={metrics.totalUsers}
          icon={<Users className="h-4 w-4 text-white" />}
          accent="bg-blue-500"
        />
        <StatCard
          label="Pending Seller"
          value={metrics.totalPendingUsers}
          icon={<Clock3 className="h-4 w-4 text-white" />}
          accent="bg-amber-500"
        />
        <StatCard
          label="Registered Seller"
          value={metrics.totalRegisteredUsers}
          icon={<UserCheck className="h-4 w-4 text-white" />}
          accent="bg-emerald-500"
        />
        <StatCard
          label="Rejected Seller"
          value={metrics.totalRejectedUsers}
          icon={<UserMinus className="h-4 w-4 text-white" />}
          accent="bg-rose-500"
        />
        <StatCard
          label="Today Registered"
          value={metrics.todayRegisteredUsers}
          icon={<UserPlus className="h-4 w-4 text-white" />}
          accent="bg-violet-500"
        />
        <StatCard
          label="Total Payment"
          value={currencyFormat(metrics.totalPayment)}
          icon={<CircleDollarSign className="h-4 w-4 text-white" />}
          accent="bg-teal-500"
        />
        <StatCard
          label="Total Due"
          value={currencyFormat(metrics.totalDue)}
          icon={<BanknoteArrowDown className="h-4 w-4 text-white" />}
          accent="bg-orange-500"
        />
        <StatCard
          label="Today Collection"
          value={currencyFormat(metrics.todayCollection)}
          icon={<WalletCards className="h-4 w-4 text-white" />}
          accent="bg-indigo-500"
        />
      </div>
    </div>
  );
}
