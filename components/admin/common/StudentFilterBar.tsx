"use client";

import { SellerListParams } from "@/appstore/modules/seller/api";
import { useGetBatchesQuery } from "@/appstore/modules/batch/api";
import { useGetBranchesQuery } from "@/appstore/modules/branch/api";
import { Button, DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import { RotateCcw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Props = {
  value: SellerListParams;
  defaultFilters?: SellerListParams;
  onChange: (filters: SellerListParams) => void;
};

const DEFAULT_FILTERS: SellerListParams = {
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
};

const cleanFilters = (filters: SellerListParams): SellerListParams => {
  const cleaned: SellerListParams = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    cleaned[key as keyof SellerListParams] = value as never;
  });

  return cleaned;
};

export default function StudentFilterBar({
  value,
  defaultFilters,
  onChange,
}: Props) {
  const baseFilters = useMemo(
    () => ({ ...DEFAULT_FILTERS, ...defaultFilters }),
    [defaultFilters],
  );
  const [draft, setDraft] = useState<SellerListParams>({
    ...baseFilters,
    ...value,
  });
  const { data: branchResponse } = useGetBranchesQuery();
  const { data: batchResponse } = useGetBatchesQuery();

  useEffect(() => {
    setDraft({ ...baseFilters, ...value });
  }, [baseFilters, value]);

  const branchOptions = (branchResponse?.branches || []).map((branch) => ({
    value: branch.id,
    label: branch.branchName,
  }));

  const batchOptions = useMemo(() => {
    const batches = batchResponse?.data || [];
    const filtered = draft.branchId
      ? batches.filter((batch) => batch.branchId === Number(draft.branchId))
      : batches;

    return filtered.map((batch) => ({
      value: batch.id,
      label: batch.batchName,
    }));
  }, [batchResponse?.data, draft.branchId]);

  const updateDraft = <K extends keyof SellerListParams>(
    key: K,
    nextValue: SellerListParams[K] | undefined,
  ) => {
    setDraft((previous) => ({
      ...previous,
      [key]: nextValue,
      ...(key === "branchId" ? { batchId: undefined } : {}),
    }));
  };

  const applyFilters = () => {
    onChange(cleanFilters({ ...draft, page: 1 }));
  };

  const resetFilters = () => {
    const next = { ...baseFilters };
    setDraft(next);
    onChange(next);
  };

  return (
    <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-800">Filter Students</h2>
        <Button icon={<RotateCcw size={14} />} onClick={resetFilters}>
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Search
          </label>
          <Input
            allowClear
            size="large"
            prefix={<Search size={14} className="text-slate-400" />}
            value={draft.search}
            onChange={(event) => updateDraft("search", event.target.value)}
            placeholder="Search name, email, phone"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Status
          </label>
          <Select
            allowClear
            size="large"
            className="w-full"
            value={draft.status}
            onChange={(nextValue) => updateDraft("status", nextValue)}
            options={[
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
            placeholder="All Status"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Users Per Page
          </label>
          <Select
            size="large"
            className="w-full"
            value={draft.limit}
            onChange={(nextValue) => updateDraft("limit", nextValue)}
            options={[
              { value: 10, label: "10 per page" },
              { value: 20, label: "20 per page" },
              { value: 50, label: "50 per page" },
              { value: 100, label: "100 per page" },
            ]}
            placeholder="Users per page"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Branch
          </label>
          <Select
            allowClear
            size="large"
            className="w-full"
            value={draft.branchId}
            onChange={(nextValue) => updateDraft("branchId", nextValue)}
            options={branchOptions}
            placeholder="All Branches"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Batch
          </label>
          <Select
            allowClear
            size="large"
            className="w-full"
            value={draft.batchId}
            onChange={(nextValue) => updateDraft("batchId", nextValue)}
            options={batchOptions}
            placeholder={draft.branchId ? "All Batches" : "Select branch first"}
            disabled={!draft.branchId}
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Date Range
          </label>
          <DatePicker.RangePicker
            className="w-full"
            size="large"
            format="YYYY-MM-DD"
            value={
              draft.dateFrom && draft.dateTo
                ? [dayjs(draft.dateFrom), dayjs(draft.dateTo)]
                : null
            }
            onChange={(_, dateStrings) => {
              updateDraft("dateFrom", dateStrings[0] || undefined);
              updateDraft("dateTo", dateStrings[1] || undefined);
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Button type="primary" icon={<Search size={14} />} onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
