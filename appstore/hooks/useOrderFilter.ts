import { useState, useMemo, ChangeEvent } from "react";
import { AllOrder, PendingOrder, OrderFilters, AllOrderStatus } from "@/lib/home";

// ─── Helper ───────────────────────────────────────────────────────────────────

function toISODate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toISOString().split("T")[0];
}

const ALL_ORDER_STATUS_LABELS: Record<AllOrderStatus, string> = {
  in_transit: "In Transit",
  in_review:  "In Review",
  delivered:  "Delivered",
  cancelled:  "Cancelled",
  returned:   "Returned",
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useOrderFilter<T extends AllOrder | PendingOrder>(orders: T[]) {
  const [filters, setFilters] = useState<OrderFilters>({
    search: "",
    fromDate: "",
    toDate: "",
  });
  const [applied, setApplied] = useState<OrderFilters>(filters);
  const [page, setPage] = useState(1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApply = () => {
    setApplied({ ...filters });
    setPage(1);
  };

  const handleReset = () => {
    const empty: OrderFilters = { search: "", fromDate: "", toDate: "" };
    setFilters(empty);
    setApplied({ ...empty });
    setPage(1);
  };

  const { search, fromDate, toDate } = applied;

  const filtered = useMemo(() => {
    return (orders as Array<AllOrder | PendingOrder>).filter((order) => {
      const q = search.toLowerCase();

      // orderTracking — AllOrder has string | null, PendingOrder has string
      const tracking =
        "orderTracking" in order
          ? (order.orderTracking ?? "")
          : "";

      // status label — AllOrder uses AllOrderStatus, PendingOrder uses OrderStatus
      const statusLabel =
        order.status in ALL_ORDER_STATUS_LABELS
          ? ALL_ORDER_STATUS_LABELS[order.status as AllOrderStatus]
          : order.status;

      const matchSearch =
        !q ||
        String(order.sn).includes(q) ||
        tracking.toLowerCase().includes(q) ||
        statusLabel.toLowerCase().includes(q);

      const orderDateISO = toISODate(order.orderDate);
      const matchFrom = !fromDate || orderDateISO >= fromDate;
      const matchTo   = !toDate   || orderDateISO <= toDate;

      return matchSearch && matchFrom && matchTo;
    });
  }, [orders, search, fromDate, toDate]);

  return {
    filters,    
    filtered,   
    page,       
    setPage,     
    handleChange, 
    handleApply, 
    handleReset, 
  };
}