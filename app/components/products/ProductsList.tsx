import { Product } from "@/app/types/productTypes";
import React, { Suspense } from "react";
import Container from "../common/Container";
import Title from "../common/Title";
import SearchProduct from "./SearchProduct";
import ProductCard from "./ProductCard";
import productsData from "@/public/assets/products.json";

const ProductsList = () => {
  const products: Product[] = productsData || [];
  
  return (
    <Container className="py-5">
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
          <ProductCard key={product.id} product={product} isLoggedIn={false} />
        ))}
      </div>
    </Container>
  );
};

export default ProductsList;
