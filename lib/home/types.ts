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

export type OrderStatus =
  | "pending"
  | "delivered"
  | "partial"
  | "untraceable"
  | "cancelled";



// Dashboard Payment related types
export interface NetProfitItem {
  label: string;
  value: number;
}

export interface PaymentSummaryItem {
  label: string;
  value: number;
  highlight?: boolean;
}

export interface PaymentData {
  netProfitItems: NetProfitItem[];
  netProfit: number;
  paymentSummaryItems: PaymentSummaryItem[];
  currency?: string;
}



export interface ProfileData {
  mobile: string;
  name: string;
  email: string;
  shopName: string;
  address: string;
}

export interface ProfileFormState extends ProfileData {
  newPassword: string;
  confirmPassword: string;
  shopLogo: File | null;
}


// Pending orders related types 
export interface PendingOrder {
  sn: number;
  orderDate: string;
  itemCount: number;
  cod: number;
  deliveryCharge: number;
  packagingCharge: number;
  wholesalePrice: number;
  netProfit: number;
  status:OrderStatus;
  orderTracking: string;
}

export interface OrderFilters {
  search: string;
  fromDate: string;
  toDate: string;
}

// All orders types

export type AllOrderStatus =
  | "in_transit"
  | "in_review"
  | "delivered"
  | "cancelled"
  | "returned";

  export interface AllOrder {
  sn: number;
  orderDate: string;
  itemCount: number;
  cod: number;
  deliveryCharge: number;
  packagingCharge: number;
  wholesalePrice: number;
  netProfit: number;
  status: AllOrderStatus;
  orderTracking: string | null;
}


// Untrackable orders types
export type UntrackedOrderStatus = "cancelled" | "pending" | "delivered";
 
export interface UntrackedOrder {
  sl: number;
  orderId: string;
  customer: string;
  phone: string;
  items: number;
  status: UntrackedOrderStatus;
}

// ─── Products Types ────────────────────────────────────────────────────────────────────

export interface ProductsTableItem {
  id: number;
  name: string;
  previousPrice: number;
  yourPrice: number;
  status: "active" | "inactive";
  home: boolean;
  added: string;
}