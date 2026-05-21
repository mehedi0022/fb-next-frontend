"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useGetSellerPriceAlertSummaryQuery,
  useGetSellerPriceAlertsQuery,
  useMarkSellerPriceAlertAsReadMutation,
  type SellerPriceAlertItem,
} from "@/appstore/modules/seller/panel.api";

type AlertFilter = "all" | "increase" | "decrease" | "pending" | "profit";

const FILTER_LABELS: Record<AlertFilter, string> = {
  all: "All impacted products",
  increase: "Price increased products",
  decrease: "Price dropped products",
  pending: "Pending seller actions",
  profit: "Profit impact alerts",
};

const toMoney = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));

export default function PriceAlertsPanel() {
  const [activeFilter, setActiveFilter] = useState<AlertFilter>("all");

  const { data: summaryRes, isFetching: isSummaryFetching } =
    useGetSellerPriceAlertSummaryQuery();
  const {
    data: alertsRes,
    isFetching: isAlertsFetching,
    isLoading: isAlertsLoading,
  } = useGetSellerPriceAlertsQuery(buildAlertQuery(activeFilter));
  const [markRead, { isLoading: isMarkingRead }] =
    useMarkSellerPriceAlertAsReadMutation();

  const summary = summaryRes?.data;
  const alerts = alertsRes?.data ?? [];
  const activeCount = alertsRes?.meta?.total ?? alerts.length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Price Increased Products"
          value={summary?.increasedProducts ?? 0}
          subtitle="Wholesale cost went up"
          tone="text-rose-600"
          isActive={activeFilter === "increase"}
          isLoading={isSummaryFetching}
          onClick={() => setActiveFilter((current) => current === "increase" ? "all" : "increase")}
        />
        <SummaryCard
          title="Price Dropped Products"
          value={summary?.droppedProducts ?? 0}
          subtitle="Wholesale cost went down"
          tone="text-emerald-600"
          isActive={activeFilter === "decrease"}
          isLoading={isSummaryFetching}
          onClick={() => setActiveFilter((current) => current === "decrease" ? "all" : "decrease")}
        />
        <SummaryCard
          title="Pending Actions"
          value={summary?.pendingSellerActions ?? 0}
          subtitle="Seller price review needed"
          tone="text-amber-600"
          isActive={activeFilter === "pending"}
          isLoading={isSummaryFetching}
          onClick={() => setActiveFilter((current) => current === "pending" ? "all" : "pending")}
        />
        <SummaryCard
          title="Profit Impact"
          value={toMoney(summary?.estimatedProfitImpact ?? 0)}
          subtitle={`${summary?.highRiskProducts ?? 0} high-risk products`}
          tone={(summary?.estimatedProfitImpact ?? 0) < 0 ? "text-rose-600" : "text-emerald-600"}
          isActive={activeFilter === "profit"}
          isLoading={isSummaryFetching}
          onClick={() => setActiveFilter((current) => current === "profit" ? "all" : "profit")}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Price Change Alerts</p>
            <p className="mt-1 text-xs text-slate-500">
              {FILTER_LABELS[activeFilter]}: {activeCount}
              {" "}products
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Unread: {summary?.unreadAlerts ?? 0}
            </span>
            {activeFilter !== "all" && (
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Show all
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1280px] text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Product
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Previous Wholesale
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Current Wholesale
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Seller Price
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Change Type
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Profit Impact
                </th>
                <th className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Pending Status
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Alert Date
                </th>
                <th className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {isAlertsLoading || isAlertsFetching ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-slate-500">
                    Loading price alerts...
                  </td>
                </tr>
              ) : alerts.length > 0 ? (
                alerts.map((alert) => (
                  <AlertRow
                    key={alert.id}
                    alert={alert}
                    isBusy={isMarkingRead}
                    onMarkRead={() => markRead(alert.id)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-slate-500">
                    No impacted products found for {FILTER_LABELS[activeFilter].toLowerCase()}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function buildAlertQuery(activeFilter: AlertFilter) {
  if (activeFilter === "increase") {
    return { page: 1, limit: 20, direction: "increase" as const };
  }

  if (activeFilter === "decrease") {
    return { page: 1, limit: 20, direction: "decrease" as const };
  }

  if (activeFilter === "pending") {
    return { page: 1, limit: 20, pendingAction: true };
  }

  if (activeFilter === "profit") {
    return { page: 1, limit: 20, profitImpact: true };
  }

  return { page: 1, limit: 20 };
}

function SummaryCard({
  title,
  value,
  subtitle,
  tone,
  isActive,
  isLoading,
  onClick,
}: {
  title: string;
  value: number | string;
  subtitle: string;
  tone: string;
  isActive: boolean;
  isLoading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition ${
        isActive
          ? "border-slate-900 ring-1 ring-slate-900"
          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{title}</p>
      <p className={`mt-2 text-2xl font-bold ${tone}`}>
        {isLoading ? "--" : value}
      </p>
      <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
    </button>
  );
}

function AlertRow({
  alert,
  isBusy,
  onMarkRead,
}: {
  alert: SellerPriceAlertItem;
  isBusy: boolean;
  onMarkRead: () => void;
}) {
  const before = Number(alert.estimatedProfitBefore ?? 0);
  const after = Number(alert.estimatedProfitAfter ?? 0);
  const impact = after - before;
  const pendingAction = alert.sellerProduct?.pricingState?.pendingAction ?? false;
  const image = alert.product?.coverImage;
  const changeLabel =
    alert.changeDirection === "increase"
      ? "Price Increased"
      : alert.changeDirection === "decrease"
        ? "Price Dropped"
        : "Margin Risk";
  const changeTone =
    alert.changeDirection === "increase"
      ? "bg-rose-100 text-rose-700"
      : alert.changeDirection === "decrease"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-amber-100 text-amber-700";

  return (
    <tr className="align-top">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {image ? (
              <img
                src={image}
                alt={alert.product?.name ?? "Product image"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                No image
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-slate-900">{alert.product?.name ?? "Unnamed product"}</p>
            <p className="mt-1 text-xs text-slate-500">{alert.message}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-right font-mono text-slate-700">
        {Number(alert.previousWholesaleMin ?? 0).toFixed(2)}
      </td>

      <td className="px-4 py-3 text-right font-mono font-semibold text-slate-900">
        {Number(alert.currentWholesaleMin ?? 0).toFixed(2)}
      </td>

      <td className="px-4 py-3 text-right font-mono text-slate-700">
        {Number(alert.sellerPriceSnapshot ?? alert.sellerProduct?.price ?? 0).toFixed(2)}
      </td>

      <td className="px-4 py-3">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${changeTone}`}>
          {changeLabel}
        </span>
      </td>

      <td
        className={`px-4 py-3 text-right font-mono font-semibold ${
          impact < 0 ? "text-rose-600" : "text-emerald-600"
        }`}
      >
        {impact > 0 ? "+" : ""}
        {impact.toFixed(2)}
      </td>

      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            pendingAction
              ? "bg-amber-100 text-amber-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {pendingAction ? "Action Required" : "Reviewed"}
        </span>
      </td>

      <td className="px-4 py-3 text-slate-600">
        {formatDate(alert.createdAt)}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <Link
            href="/dashboard/my-products"
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
          >
            Update Price
          </Link>
          {alert.status === "unread" && (
            <button
              type="button"
              disabled={isBusy}
              onClick={onMarkRead}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Mark read
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
