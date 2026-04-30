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
    amount: 25578.0,
    badge: "24 Parcel",
    badgeColor: "teal",
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
    id: "total-wholesale",
    title: "Total Wholesale Price",
    icon: "💰",
    amount: 0.0,
    badge: "0 Delivered",
    badgeColor: "blue",
    hasBreakdown: true,
  },
  {
    id: "packaging-charge",
    title: "Packaging Charge",
    icon: "📫",
    amount: 0.0,
    badge: "0 Delivered",
    badgeColor: "gray",
  },
  {
    id: "delivery-charge",
    title: "Delivery Charge",
    icon: "🚚",
    amount: 0.0,
    badge: "0 Delivered",
    badgeColor: "green",
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
