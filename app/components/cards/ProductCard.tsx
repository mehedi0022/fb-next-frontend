import React from "react";
export interface Product  {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  finalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
  category: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  isFeatured?: boolean;
  createdAt: string; // ISO date
};


const ProductCard = () => {
  const products: Product[] = [
    {
      id: "p-101",
      title: "Nike Air Max 270",
      description: "Comfortable and stylish sneakers for everyday use.",
      price: 120,
      discountPercentage: 10,
      finalPrice: 108,
      rating: 4.8,
      reviewCount: 320,
      stock: 50,
      brand: "Nike",
      category: "Shoes",
      tags: ["sport", "running", "casual"],
      thumbnail: "https://i.ibb.co/nike1.jpg",
      images: ["https://i.ibb.co/nike1.jpg", "https://i.ibb.co/nike2.jpg"],
      isFeatured: true,
      createdAt: "2026-04-01T10:00:00Z",
    },
    {
      id: "p-102",
      title: "Apple iPhone 14",
      description: "Latest Apple smartphone with powerful performance.",
      price: 999,
      discountPercentage: 5,
      finalPrice: 949,
      rating: 4.9,
      reviewCount: 850,
      stock: 20,
      brand: "Apple",
      category: "Mobile",
      tags: ["smartphone", "ios"],
      thumbnail: "https://i.ibb.co/iphone1.jpg",
      images: ["https://i.ibb.co/iphone1.jpg", "https://i.ibb.co/iphone2.jpg"],
      isFeatured: true,
      createdAt: "2026-03-20T12:30:00Z",
    },
  ];

  return <div>
    

  </div>;
};

export default ProductCard;
