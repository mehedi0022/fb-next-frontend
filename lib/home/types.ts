import React from 'react';

// Product related types
export type Price = {
  wholesale: number;   // supplier price
  sale: number;        // selling price
  shipping?: number;   // delivery / dropshipping cost
  profit: number;      // calculated profit
  currency: "BDT" | string; // currency code, default is BDT
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: Price; 
  stock: number;
  isInStock: boolean;
  thumbnail: string;
  images: string[];
  category: string;
  brand?: string;
  createdAt: string;
};

// Common component props
export interface SearchParamsProps {
  product?: string;
  category?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon: React.ElementType; 
}

export interface ProductCardProps {
  product: Product;
  isLoggedIn?: boolean; // Make optional so component can use Redux fallback
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export interface BatchInBranch {
  id: number;
  batchName: string;
  branchId: number;
  maxStudents: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    users: number;
  };
}

export interface Branch {
  id: number;
  branchName: string;
  branchDescription: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  batches: BatchInBranch[];
}

// Dashboard related types

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

// ─── User / Seller ────────────────────────────────────────────────────────────

export interface SellerInfo {
  sellerCode: string;
  email: string;
  phone: string;
  domain: string;
  memberName: string;
  memberSince: string;
}

export interface CourseInfo {
  courseName: string;
  batchNo: string;
  teacherName: string | null;
  teacherWhatsApp: string | null;
  batchWhatsAppGroup: string | null;
  totalClassWillShow: string | null;
  googleMeetLink: string | null;
  courseCompletedStatus: string | null;
}

// ─── Dashboard Finance ────────────────────────────────────────────────────────

export interface FinanceSummary {
  currentBalance: number;
  depositAmount: number;
  totalPaid: number;
  reserved: number;
  withdrawable: number;
}

// ─── Dashboard Stats Card ─────────────────────────────────────────────────────

export type BadgeColor = "green" | "teal" | "blue" | "orange" | "red" | "gray";

export interface StatCard {
  id: string;
  title: string;
  icon: string;
  amount: number;
  badge: string;
  badgeColor: BadgeColor;
  subItems?: StatSubItem[];
  hasBreakdown?: boolean;
}

export interface StatSubItem {
  label: string;
  value: number;
}

// ─── Date Filter ──────────────────────────────────────────────────────────────

export interface DateFilter {
  fromDate: string;
  toDate: string;
}

// ─── Table / Orders ───────────────────────────────────────────────────────────

export interface Order {
  id: string;
  date: string;
  product: string;
  customer: string;
  amount: number;
  status: OrderStatus;
}

export type OrderStatus =
  | "pending"
  | "delivered"
  | "partial"
  | "untraceable"
  | "cancelled";

// ─── Profile ──────────────────────────────────────────────────────────────────

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
}
