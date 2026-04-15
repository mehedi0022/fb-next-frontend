import { Product } from "@/app/types/productTypes";
import React, { Suspense } from "react";
import Container from "../common/Container";
import Title from "../common/Title";
import SearchProduct from "./SearchProduct";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const sampleProducts = [
    {
      title: "EMS Butterfly Massager",
      slug: "ems-butterfly-massager",
      description: "Electric muscle stimulator for body massage.",
      price: {
        wholesale: 40,
        sale: 50,
        shipping: 30,
        profit: 10,
        currency: "BDT" as const, // Type safety এর জন্য
      },
      stock: 100,
      isInStock: true,
      thumbnail: "https://freelancerbangladesh.com/uploads/product/product-20260313150745-kCEiVs.jpg",
      images: ["https://i.ibb.co/example1.jpg"],
      category: "Health",
      createdAt: "2026-04-01T10:00:00Z",
    },
    {
      title: "Portable Mini Blender for Smoothies",
      slug: "portable-mini-blender",
      description: "Rechargeable mini blender for smoothies.",
      price: {
        wholesale: 400,
        sale: 900,
        shipping: 30,
        profit: 500,
        currency: "BDT" as const,
      },
      stock: 50,
      isInStock: true,
      thumbnail: "https://freelancerbangladesh.com/uploads/product/product-20260313154044-CPr4DF.jpg",
      images: ["https://i.ibb.co/example2.jpg"],
      category: "Kitchen",
      createdAt: "2026-04-02T12:00:00Z",
    },
  ];

  const products: Product[] = Array(30)
    .fill(null)
    .map((_, index) => {
      const baseProduct = sampleProducts[index % sampleProducts.length];
      return {
        ...baseProduct,
        id: `p-${101 + index}`,
      };
    });

  return (
    <section className="bg-ternary">
      <Container className="py-5 ">
        {/* Title & Subtile */}
        <Title subtitle="আমাদের রয়েছে প্রায় ৫০০+টিরও বেশি প্রোডাক্ট, যেগুলো আপনি সহজেই অনলাইনে বিক্রি করতে পারবেন।">
          আমাদের প্রোডাক্ট সমূহ
        </Title>

        {/* Searching box */}
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchProduct />
        </Suspense>

        {/* Product List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 mt-7">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isLoggedIn={true} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProductsList;
