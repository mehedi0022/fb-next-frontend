import React from "react";

// Product related types
export type Price = {
  wholesale: number; // supplier price
  sale: number; // selling price
  shipping?: number; // delivery / dropshipping cost
  profit: number; // calculated profit
  currency: "BDT" | string; // currency code, default is BDT
};

export type Product = {
  id: string;
  sku?: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description: string;
  videoUrl?: string | null;
  price: Price;
  stock: number;
  isInStock: boolean;
  thumbnail: string;
  images: string[];
  variants?: {
    sku: string;
    stock: number;
    wholesalePrice: number;
    suggestedPrice: number;
    attributes: { attributeName: string; valueName: string }[];
  }[];
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

// -------- Branch Related -----------
export interface BatchInBranch {
  id: number;
  batchName: string;
  branchId: number;
  maxStudents: number;
  status: "active" | "inactive";
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
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  batches: BatchInBranch[];
}

export interface BranchFormData {
  branchName: string;
  branchDescription: string;
  status: "active" | "inactive";
}

// -------- Batch Related -----------
export type Batch = {
  id: number;
  batchName: string;
  branchId: number;
  maxStudents: number;
  status: "active" | "inactive";
  branch: {
    id: number;
    branchName: string;
    branchDescription: string;
    status: "active" | "inactive";
    createdAt: string;
    updatedAt: string;
  };
  _count: {
    users: number;
  };
};

export type BatchFormData = {
  batchName: string;
  branchId: number;
  maxStudents: number;
  status: "active" | "inactive";
};

// -------- Admin settings content types -----------
export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  sort_order: number;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface FeatureFormData {
  title: string;
  description: string;
  sort_order: number;
  status: "active" | "inactive";
}

export interface FeaturesResponse {
  success: boolean;
  data: FeatureItem[];
}

export interface StepItem {
  id: number;
  description: string;
  sort_order: number;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface StepFormData {
  description: string;
  sort_order: number;
  status: "active" | "inactive";
}

export interface StepsResponse {
  success: boolean;
  data: StepItem[];
}

export interface FaqItem {
  id: string | number;
  question: string;
  answer: string;
  status: "active" | "inactive";
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FaqFormData {
  question: string;
  answer: string;
  sort_order: number;
  status: "active" | "inactive";
}

export interface FaqsResponse {
  success: boolean;
  data: FaqItem[];
}

// -------- Banner Related -----------
export interface BannerItem {
  id: number;
  title: string;
  highlight_text: string;
  subtitle: string;
  status: "active" | "inactive";
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BannerFormData {
  title: string;
  highlight_text: string;
  subtitle: string;
  status: "active" | "inactive";
  image?: string;
}

export interface BannersResponse {
  success: boolean;
  data: BannerItem[];
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
  status: OrderStatus;
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
  category?: string;
}

// ─── Categories Types ────────────────────────────────────────────────────────────────────

export interface CategoryItem {
  id: number;
  category: string;
  subcategory: string;
  label: string;
  sort: number;
  status: "active" | "inactive";
  home: boolean;
  added: string;
}
