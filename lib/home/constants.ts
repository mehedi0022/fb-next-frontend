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
  UntrackedOrder,
  ProductsTableItem,
  CategoryItem,
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


// Untrackable orders constants

export const UNTRACKED_ORDERS: UntrackedOrder[] = [
  { sl: 1, orderId: "#4553", customer: "test order",           phone: "01853180152/01621905416", items: 1, status: "cancelled" },
  { sl: 2, orderId: "#3538", customer: "Test VPS",             phone: "01572109979",             items: 1, status: "cancelled" },
  { sl: 3, orderId: "#3537", customer: "Test Vps 2",           phone: "01572109979",             items: 1, status: "cancelled" },
  { sl: 4, orderId: "#3536", customer: "Test Order",           phone: "01700111222",             items: 1, status: "cancelled" },
  { sl: 5, orderId: "#3026", customer: "Freelancer Bangladesh", phone: "01931645490",            items: 1, status: "cancelled" },
]; 

// ─── My Products Constants ────────────────────────────────────────────────────────────────

export const PRODUCTS: ProductsTableItem[] = [
  { id: 1,  name: "Manual Oil Extractor Siphon Pump for Car and Truck With Water Diesel Hose", previousPrice: 800,  yourPrice: 670,  status: "active",   home: true,  added: "May 02, 2026" },
  { id: 2,  name: "Personal Usb Juicer Cup Portable Juicer Blender",                           previousPrice: 1200, yourPrice: 1050, status: "active",   home: true,  added: "May 02, 2026" },
  { id: 3,  name: "Portable Mini Rechargeable Juicer",                                         previousPrice: 1100, yourPrice: 950,  status: "active",   home: true,  added: "May 01, 2026" },
  { id: 4,  name: "12 in 1 Multifunctional Manual Vegetable Chopper Saving Food Chopper",      previousPrice: 1100, yourPrice: 1050, status: "active",   home: true,  added: "Apr 30, 2026" },
  { id: 5,  name: "Silver Crest 3000W Grinder",                                                previousPrice: 1200, yourPrice: 1150, status: "active",   home: true,  added: "Apr 30, 2026" },
  { id: 6,  name: "Portable Juicer Blender",                                                   previousPrice: 1050, yourPrice: 900,  status: "active",   home: true,  added: "Apr 29, 2026" },
  { id: 7,  name: "Electric Hand Mixer with 5 Speed",                                          previousPrice: 950,  yourPrice: 800,  status: "active",   home: true,  added: "Apr 28, 2026" },
  { id: 8,  name: "Stainless Steel Pressure Cooker 5L",                                        previousPrice: 1800, yourPrice: 1500, status: "active",   home: false, added: "Apr 27, 2026" },
  { id: 9,  name: "Non Stick Frying Pan Set 3pcs",                                             previousPrice: 1200, yourPrice: 990,  status: "inactive", home: false, added: "Apr 26, 2026" },
  { id: 10, name: "Digital Kitchen Scale 5kg",                                                 previousPrice: 600,  yourPrice: 490,  status: "active",   home: true,  added: "Apr 25, 2026" },
  { id: 11, name: "Rechargeable LED Camping Lantern",                                          previousPrice: 750,  yourPrice: 590,  status: "active",   home: false, added: "Apr 24, 2026" },
  { id: 12, name: "Portable Electric Kettle 1.5L",                                             previousPrice: 850,  yourPrice: 700,  status: "inactive", home: false, added: "Apr 23, 2026" },
  { id: 13, name: "Bamboo Cutting Board Set",                                                  previousPrice: 500,  yourPrice: 390,  status: "active",   home: true,  added: "Apr 22, 2026" },
  { id: 14, name: "Silicone Cooking Utensil Set 6pcs",                                        previousPrice: 680,  yourPrice: 550,  status: "active",   home: false, added: "Apr 21, 2026" },
  { id: 15, name: "Stainless Steel Water Bottle 750ml",                                        previousPrice: 450,  yourPrice: 350,  status: "active",   home: true,  added: "Apr 20, 2026" },
  { id: 16, name: "Vegetable Spiralizer 3 Blade",                                              previousPrice: 700,  yourPrice: 560,  status: "inactive", home: false, added: "Apr 19, 2026" },
  { id: 17, name: "Handheld Immersion Blender 500W",                                           previousPrice: 1100, yourPrice: 880,  status: "active",   home: true,  added: "Apr 18, 2026" },
  { id: 18, name: "Cast Iron Skillet 10 inch",                                                 previousPrice: 2200, yourPrice: 1800, status: "active",   home: false, added: "Apr 17, 2026" },
];

// ─── My Categories Constants ────────────────────────────────────────────────────────────────

export const CATEGORY_DATA: CategoryItem[] = [
  {
    id: 1,
    category: "Hot Deals",
    subcategory: "Plug In Quran",
    label: "-",
    sort: 0,
    status: "active",
    home: true,
    added: "Apr 29, 2026",
  },
  {
    id: 2,
    category: "Hot Deals",
    subcategory: "Juicers",
    label: "-",
    sort: 0,
    status: "active",
    home: true,
    added: "Apr 19, 2026",
  },
  {
    id: 3,
    category: "Hot Deals",
    subcategory: "",
    label: "-",
    sort: 0,
    status: "active",
    home: true,
    added: "Apr 19, 2026",
  },
  {
    id: 4,
    category: "New Arrival",
    subcategory: "",
    label: "-",
    sort: 1,
    status: "active",
    home: true,
    added: "Apr 19, 2026",
  },
  {
    id: 5,
    category: "Gadgets",
    subcategory: "",
    label: "-",
    sort: 2,
    status: "active",
    home: true,
    added: "Mar 02, 2026",
  },
];
