// Sidebar Types 

export interface AdminNavChild {
  label: string;
  href: string;
}

export interface AdminNavItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  badge?: number;
  children?: AdminNavChild[];
}

// Seller Types

export interface Seller {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  shopName?: string;
  branchId?: number;
  domain_name: string | null;
  seller_code: string;
  status: string;
  sellerPackageId?: number | null;
  sellerPackage?: PackageItem | null;
  sellerPackageName?: string | null;
  totalAmount?: string | number;
  totalPaid?: string | number;
  dueAmount?: string | number;
  sellerAccount?: {
    sellerPackageId: number;
    totalAmount: string;
    totalPaid: string;
    dueAmount: string;
    sellerPackage?: {
      name: string;
    };
  } | null;
  batch?: {
    id: number;
    batchName: string;
    branch?: {
      id: number;
      branchName: string;
    };
  } | null;
  page_name?: string;
}

export interface SellerResponse {
  success: boolean;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: Seller[];
}

export interface SellerSingleResponse {
  success: boolean;
  data: Seller;
}


// Package Types

export interface PackageItem {
  id: number;
  name: string;
  price: string;
  status: "active" | "inactive";
  createdAt?: string;
}

export interface PackageFormData {
  name: string;
  price: string;
  status: "active" | "inactive";
}


export interface PackagesResponse {
  success: boolean;
  data: PackageItem[];
}

export interface DashboardFilters {
  branchId: number | null;
  batchId: number | null;
  dateFrom: string | null;
  dateTo: string | null;
}

export interface DashboardMetrics {
  totalUsers: number;
  totalPendingUsers: number;
  totalRegisteredUsers: number;
  totalRejectedUsers: number;
  todayRegisteredUsers: number;
  totalPayment: number;
  totalDue: number;
  todayCollection: number;
}

export interface DashboardMetricsResponse {
  success: boolean;
  filters: DashboardFilters;
  data: DashboardMetrics;
}

export interface SellerAccountSummaryResponse {
  success: boolean;
  data: {
    seller: {
      name: string;
      email: string;
      phone: string;
      sellerCode: string;
    };
    totalAmount: string;
    totalPaid: string;
    due: number;
  };
}

export interface SellerPaymentHistoryItem {
  id: number;
  userId: number;
  accountId: number;
  amount: string;
  method: string;
  status: string;
  type: string;
  transactionId: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SellerPaymentHistoryResponse {
  success: boolean;
  data: SellerPaymentHistoryItem[];
}
