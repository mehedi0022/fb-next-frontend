// API endpoints
export const API_ENDPOINTS = {
  PRODUCTS: "/api/products",
  USERS: "/api/users",
  CATEGORIES: "/api/categories",
} as const;

// App configuration
export const APP_CONFIG = {
  SITE_NAME: "Freelancer Bangladesh",
  SITE_DESCRIPTION: "বাংলাদেশের সর্ববৃহৎ ড্রপশিপিং প্ল্যাটফর্ম",
  DEFAULT_CURRENCY: "BDT",
  MAX_PRODUCTS_PER_PAGE: 20,
} as const;

// Navigation items
export const NAVIGATION_ITEMS = [
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "ক্যাটাগরি", href: "/categories" },
  { label: "প্রোডাক্ট", href: "/products" },
  { label: "যোগাযোগ", href: "/contact" },
] as const;

// Dashboard

import type {
  NavItem,
  SellerInfo,
  CourseInfo,
  FinanceSummary,
  StatCard,
  PaymentData,
  ProfileData,
  PendingOrder,
  AllOrder,
} from "./types";

// ─── Navigation Items ─────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile Page", href: "/dashboard/profile" },
  { label: "Pending Orders", href: "/dashboard/pending-orders" },
  { label: "All Orders", href: "/dashboard/all-orders" },
  { label: "Untraceable Orders", href: "/dashboard/untraceable-orders" },
  { label: "My Products", href: "/dashboard/my-products" },
  { label: "My Categories", href: "/dashboard/my-categories" },
  { label: "Payment History", href: "/dashboard/payment-history" },
  { label: "Payment Methods", href: "/dashboard/payment-methods" },
];

// ─── Seller Info ──────────────────────────────────────────────────────────────

export const SELLER_INFO: SellerInfo = {
  sellerCode: "FB158496",
  email: "ilkhan@gmail.com",
  phone: "01716070411",
  domain: "www.save71.com",
  memberName: "Imran Khan",
  memberSince: "Mar 02, 2026",
};

// ─── Course Info ──────────────────────────────────────────────────────────────

export const COURSE_INFO: CourseInfo = {
  courseName: "Learn E Commerce from Zero to Sales",
  batchNo: "April Month",
  teacherName: null,
  teacherWhatsApp: null,
  batchWhatsAppGroup: null,
  totalClassWillShow: null,
  googleMeetLink: null,
  courseCompletedStatus: null,
};

// ─── Finance Summary ──────────────────────────────────────────────────────────

export const FINANCE_SUMMARY: FinanceSummary = {
  currentBalance: -160.0,
  depositAmount: 0.0,
  totalPaid: 0.0,
  reserved: 0.0,
  withdrawable: 0.0,
};

// ─── Stat Cards ───────────────────────────────────────────────────────────────

export const STAT_CARDS: StatCard[] = [
  {
    id: "total-parcel",
    title: "Total Parcel",
    icon: "📦",
    amount: 31679.0,
    badge: "24 Parcel",
    badgeColor: "green",
    subItems: [],
    hasBreakdown: true,
  },
  {
    id: "total-delivered",
    title: "Total Delivered",
    icon: "✅",
    amount: 0.0,
    badge: "0 Parcel",
    badgeColor: "green",
    subItems: [
      { label: "Delivery Charge", value: 0.0 },
      { label: "Packaging Charge", value: 0.0 },
    ],
    hasBreakdown: true,
  },
  {
    id: "partial-delivered",
    title: "Partial Delivered",
    icon: "🔄",
    amount: 0.0,
    badge: "0 Parcel",
    badgeColor: "orange",
    subItems: [
      { label: "Delivery Charge", value: 0.0 },
      { label: "Packaging Charge", value: 0.0 },
    ],
    hasBreakdown: true,
  },
  {
    id: "total-wholesale-price",
    title: "Total Wholesale Price",
    icon: "🪙",
    amount: 0.0,
    badge: "0 Delivered",
    badgeColor: "blue",
    subItems: [],
    hasBreakdown: true,
  },
  {
    id: "packaging-charge",
    title: "Packaging Charge",
    icon: "🖨️",
    amount: 0.0,
    badge: "0 Delivered",
    badgeColor: "green",
    subItems: [],
    hasBreakdown: false,
  },
  {
    id: "delivery-charge",
    title: "Delivery Charge",
    icon: "🚚",
    amount: 0.0,
    badge: "0 Delivered",
    badgeColor: "red",
    subItems: [],
    hasBreakdown: false,
  },
  {
    id: "total-cancel",
    title: "Total Cancel",
    icon: "❌",
    amount: 860.0,
    badge: "0 Parcel",
    badgeColor: "green",
    subItems: [
      { label: "Delivery Charge", value: 150.0 },
      { label: "Packaging Charge", value: 50.0 },
    ],
    hasBreakdown: true,
  },
  {
    id: "pending",
    title: "Pending",
    icon: "⏳",
    amount: 11469.0,
    badge: "0 Parcel",
    badgeColor: "green",
    subItems: [
      { label: "Delivery Charge", value: 850.0 },
      { label: "Packaging Charge", value: 270.0 },
    ],
    hasBreakdown: true,
  },
  {
    id: "delivered-approval-pending",
    title: "Delivered Approval Pending",
    icon: "🕐",
    amount: 0.0,
    badge: "0 Parcel",
    badgeColor: "green",
    subItems: [
      { label: "Delivery Charge", value: 0.0 },
      { label: "Packaging Charge", value: 0.0 },
    ],
    hasBreakdown: true,
  },
  {
    id: "hold",
    title: "Hold",
    icon: "✋",
    amount: 0.0,
    badge: "0 Parcel",
    badgeColor: "green",
    subItems: [
      { label: "Delivery Charge", value: 0.0 },
      { label: "Packaging Charge", value: 0.0 },
    ],
    hasBreakdown: true,
  },
  {
    id: "in-review",
    title: "In Review",
    icon: "🔍",
    amount: 1470.0,
    badge: "0 Parcel",
    badgeColor: "green",
    subItems: [
      { label: "Delivery Charge", value: 200.0 },
      { label: "Packaging Charge", value: 80.0 },
    ],
    hasBreakdown: true,
  },
  {
    id: "unknown-approval-pending",
    title: "Unknown Approval Pending",
    icon: "❓",
    amount: 0.0,
    badge: "0 Parcel",
    badgeColor: "green",
    subItems: [
      { label: "Delivery Charge", value: 0.0 },
      { label: "Packaging Charge", value: 0.0 },
    ],
    hasBreakdown: true,
  },
  {
    id: "unknown",
    title: "Unknown",
    icon: "🔮",
    amount: 17880.0,
    badge: "0 Parcel",
    badgeColor: "green",
    subItems: [
      { label: "Delivery Charge", value: 1420.0 },
      { label: "Packaging Charge", value: 180.0 },
    ],
    hasBreakdown: true,
  },
  {
    id: "net-profit",
    title: "Net Profit",
    icon: "💰",
    amount: -160.0,
    badge: "1 Delivered",
    badgeColor: "blue",
    subItems: [
      { label: "Product Charges ( )", value: 0.0 },
      { label: "Cancelled Charges ( )", value: 160.0 },
    ],
    hasBreakdown: true,
  },
];

// ─── Currency Formatter ───────────────────────────────────────────────────────

export function formatBDT(amount: number): string {
  const abs = Math.abs(amount).toFixed(2);
  return `${amount < 0 ? "-" : ""}${abs} BDT`;
}

// ─── Badge color map ──────────────────────────────────────────────────────────

export const BADGE_COLOR_MAP: Record<string, string> = {
  green: "bg-green-500",
  teal: "bg-teal-500",
  blue: "bg-blue-500",
  orange: "bg-orange-400",
  red: "bg-red-500",
  gray: "bg-gray-500",
};


export const PAYMENT_DATA: PaymentData = {
  currency: "৳",
  netProfit: -160,
  netProfitItems: [
    { label: "Delivered COD", value: 0 },
    { label: "Delivered Wholesale (-)", value: 0 },
    { label: "Delivered Delivery Charge (-)", value: 0 },
    { label: "Delivered Packaging Charge (-)", value: 0 },
    { label: "Delivered Net Profit Base", value: 0 },
    { label: "Partial Delivered Charges (-)", value: 0 },
    { label: "Cancelled Charges (-)", value: 160 },
  ],
  paymentSummaryItems: [
    { label: "Net Profit After Deductions", value: -160, highlight: true },
    { label: "Total Paid", value: 0 },
    { label: "Reserved Requests", value: 0 },
    { label: "Last Paid", value: 0 },
    { label: "Current Check Balance", value: -160, highlight: true },
  ],
};

// Profile related constants
export const PROFILE_DATA: ProfileData = {
  mobile: "01716070411",
  name: "Imran Khan",
  email: "ikhan@gmail.com",
  shopName: "Save 71",
  address: "Dhaka",
};

// Pending orders related constants
export const ORDERS: PendingOrder[] = [
  {
    sn: 1,
    orderDate: "2024-03-01",
    itemCount: 3,
    cod: 1500,
    deliveryCharge: 60,
    packagingCharge: 20,
    wholesalePrice: 900,
    netProfit: 520,
    status: "delivered",
    orderTracking: "TRK-001234",
  },
  {
    sn: 2,
    orderDate: "2024-03-05",
    itemCount: 1,
    cod: 800,
    deliveryCharge: 60,
    packagingCharge: 10,
    wholesalePrice: 600,
    netProfit: 130,
    status: "pending",
    orderTracking: "TRK-001235",
  },
  {
    sn: 3,
    orderDate: "2024-03-08",
    itemCount: 5,
    cod: 3200,
    deliveryCharge: 80,
    packagingCharge: 30,
    wholesalePrice: 2100,
    netProfit: 990,
    status: "partial",
    orderTracking: "TRK-001236",
  },
  {
    sn: 4,
    orderDate: "2024-03-10",
    itemCount: 2,
    cod: 1200,
    deliveryCharge: 60,
    packagingCharge: 20,
    wholesalePrice: 800,
    netProfit: -160,
    status: "cancelled",
    orderTracking: "TRK-001237",
  },
  {
    sn: 5,
    orderDate: "2024-03-12",
    itemCount: 4,
    cod: 2500,
    deliveryCharge: 70,
    packagingCharge: 25,
    wholesalePrice: 1800,
    netProfit: 0,
    status: "untraceable",
    orderTracking: "TRK-001238",
  },
];

// All Orders related constants

export const ALL_ORDERS: AllOrder[] = [
  { sn: 1, orderDate: "2026-04-30", itemCount: 1, cod: 1570, deliveryCharge: 70,  packagingCharge: 30, wholesalePrice: 900,  netProfit: 570, status: "in_transit", orderTracking: null },
  { sn: 2, orderDate: "2026-04-27", itemCount: 1, cod: 1570, deliveryCharge: 70,  packagingCharge: 30, wholesalePrice: 900,  netProfit: 570, status: "in_transit", orderTracking: null },
  { sn: 3, orderDate: "2026-04-27", itemCount: 2, cod: 1620, deliveryCharge: 120, packagingCharge: 30, wholesalePrice: 850,  netProfit: 620, status: "in_transit", orderTracking: null },
  { sn: 4, orderDate: "2026-04-27", itemCount: 1, cod: 1240, deliveryCharge: 70,  packagingCharge: 30, wholesalePrice: 670,  netProfit: 470, status: "in_transit", orderTracking: null },
  { sn: 5, orderDate: "2026-04-25", itemCount: 1, cod: 870,  deliveryCharge: 120, packagingCharge: 30, wholesalePrice: 350,  netProfit: 370, status: "in_transit", orderTracking: null },
  { sn: 6, orderDate: "2026-04-24", itemCount: 1, cod: 540,  deliveryCharge: 70,  packagingCharge: 30, wholesalePrice: 150,  netProfit: 290, status: "in_review",  orderTracking: "TRK-006" },
  { sn: 7, orderDate: "2026-04-23", itemCount: 1, cod: 930,  deliveryCharge: 130, packagingCharge: 30, wholesalePrice: 570,  netProfit: 200, status: "in_review",  orderTracking: "TRK-007" },
  { sn: 8, orderDate: "2026-04-23", itemCount: 1, cod: 880,  deliveryCharge: 130, packagingCharge: 30, wholesalePrice: 350,  netProfit: 370, status: "in_review",  orderTracking: "TRK-008" },
  { sn: 9, orderDate: "2026-04-23", itemCount: 1, cod: 1329, deliveryCharge: 130, packagingCharge: 30, wholesalePrice: 750,  netProfit: 419, status: "in_transit", orderTracking: null },
];