"use client";

import { useGetSellerOrderSummaryQuery } from "@/appstore/modules/orders/api";
import { StatCard, StatCardItem } from "@/lib/home";

const toNumber = (value?: string) => Number(value ?? 0);

export default function StatCardsGrid() {
  const { data } = useGetSellerOrderSummaryQuery();
  const counts = data?.data?.counts;
  const amounts = data?.data?.amounts;

  const cards: StatCard[] = [
    {
      id: "total-parcel",
      title: "Total Parcel",
      icon: "📦",
      amount: toNumber(amounts?.totalGrand),
      badge: `${counts?.total ?? 0} Parcel`,
      badgeColor: "green",
      subItems: [],
      hasBreakdown: false,
    },
    {
      id: "delivered",
      title: "Delivered",
      icon: "✅",
      amount: toNumber(amounts?.totalProfit),
      badge: `${counts?.delivered ?? 0} Parcel`,
      badgeColor: "blue",
      subItems: [],
      hasBreakdown: false,
    },
    {
      id: "pending",
      title: "Pending",
      icon: "⏳",
      amount: 0,
      badge: `${counts?.pending ?? 0} Parcel`,
      badgeColor: "orange",
      subItems: [],
      hasBreakdown: false,
    },
    {
      id: "cancelled",
      title: "Cancelled",
      icon: "❌",
      amount: 0,
      badge: `${counts?.cancelled ?? 0} Parcel`,
      badgeColor: "red",
      subItems: [],
      hasBreakdown: false,
    },
    {
      id: "shipped",
      title: "Shipped",
      icon: "🚚",
      amount: 0,
      badge: `${counts?.shipped ?? 0} Parcel`,
      badgeColor: "teal",
      subItems: [],
      hasBreakdown: false,
    },
    {
      id: "returned",
      title: "Returned",
      icon: "↩️",
      amount: 0,
      badge: `${counts?.returned ?? 0} Parcel`,
      badgeColor: "gray",
      subItems: [],
      hasBreakdown: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <StatCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
