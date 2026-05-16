"use client";

import { NAV_ITEMS, SELLER_INFO } from "@/lib/home";
import { usePathname } from "next/navigation";

function getPageLabel(pathname: string): string {
  if (pathname === "/dashboard" || pathname === "/dashboard/") return "Overview";
  const match = NAV_ITEMS.find((item) => item.href === pathname);
  return match ? match.label : "Overview";
}

export default function Header() {
  const pathname = usePathname();
  const pageLabel = getPageLabel(pathname);

  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
            Seller Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {pageLabel}
          </h1>
        </div>

        <div className="w-full lg:max-w-sm">
          <input
            type="text"
            placeholder="Search orders, products, categories..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
            aria-label="Search"
          />
        </div>

        <div className="text-left lg:text-right">
          <p className="text-sm text-slate-600">
            Welcome back, <strong className="text-slate-900">{SELLER_INFO.memberName}</strong>
          </p>
          <p className="text-xs text-slate-500">Member since {SELLER_INFO.memberSince}</p>
        </div>
      </div>
    </header>
  );
}
