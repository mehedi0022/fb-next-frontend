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
  isLoggedIn: boolean;
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}