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
  domain_name: string | null; 
  seller_code: string;
  status: string;
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