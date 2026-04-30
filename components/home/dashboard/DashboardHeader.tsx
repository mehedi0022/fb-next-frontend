"use client";

import { NAV_ITEMS, SELLER_INFO } from "@/lib/home";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function getPageLabel(pathname: string): string {
  // Handle dashboard routes properly
  if (pathname === "/dashboard" || pathname === "/dashboard/") return "Overview";
  
  // Check for exact match first
  const exactMatch = NAV_ITEMS.find((item) => item.href === pathname);
  if (exactMatch) return exactMatch.label;
  
  // Handle nested dashboard routes
  if (pathname.startsWith("/dashboard/")) {
    const subPath = pathname.replace("/dashboard", "");
    const nestedMatch = NAV_ITEMS.find((item) => item.href === subPath);
    if (nestedMatch) return nestedMatch.label;
  }
  
  return "Overview";
}

export default function Header() {
  const pathname = usePathname();
  const [pageLabel, setPageLabel] = useState("Overview");

  useEffect(() => {
    setPageLabel(getPageLabel(pathname));
  }, [pathname]);

  return (
    <header className="dash-header m-4">
      <div className="dash-header__left">
        <p className="dash-header__section">CUSTOMER DASHBOARD</p>
        <h1 className="dash-header__title">{pageLabel}</h1>
      </div>

      <div className="dash-header__search">
        <svg
          className="search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          aria-label="Search"
        />
      </div>

      <div className="dash-header__user">
        <p className="dash-header__welcome">
          Welcome back, <strong>{SELLER_INFO.memberName}</strong>
        </p>
        <p className="dash-header__since">
          Member since {SELLER_INFO.memberSince}
        </p>
      </div>
    </header>
  );
}
