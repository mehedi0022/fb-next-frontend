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