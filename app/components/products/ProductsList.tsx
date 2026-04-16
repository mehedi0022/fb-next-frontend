import { Product } from "@/app/types/productTypes";
import React, { Suspense } from "react";
import Container from "../common/Container";
import Title from "../common/Title";
import SearchProduct from "./SearchProduct";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  searchParams: { product?: string };
}

const ProductsList: React.FC<ProductsListProps> = ({ searchParams }) => {
  const search = searchParams?.product || "";
  const searchText = search.trim().toLowerCase();

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
        currency: "BDT" as const,
      },
      stock: 100,
      isInStock: true,
      thumbnail:
        "https://freelancerbangladesh.com/uploads/product/product-20260313150745-kCEiVs.jpg",
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
      thumbnail:
        "https://freelancerbangladesh.com/uploads/product/product-20260313154044-CPr4DF.jpg",
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

  // Smart filtering
  const filteredProducts =
    searchText === ""
      ? products
      : products.filter((product) =>
        `${product.title} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(searchText)
      );

  return (
    <section className="bg-ternary pt-10">
      <Container className="py-5">
        <Title subtitle="আমাদের রয়েছে প্রায় ৫০০+টিরও বেশি প্রোডাক্ট, যেগুলো আপনি সহজেই অনলাইনে বিক্রি করতে পারবেন।">
          আমাদের প্রোডাক্ট সমূহ
        </Title>

        <Suspense fallback="Loading...">
          <SearchProduct />
        </Suspense>

        {/* Search Results Info */}
        {search && (
          <p className="text-sm text-gray-500 mt-2">
            Showing results for &quot;{search}&quot;
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 mt-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLoggedIn={true}
            />
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 mb-4">
                <span className="text-3xl">🔍</span>
              </div>

              <h2 className="text-lg font-semibold text-gray-700">
                No products found
              </h2>

              <p className="text-gray-500 mt-2 max-w-md">
                We could not find anything matching your search. Try different
                keywords.
              </p>

              <a
                href="?"
                className="mt-5 px-5 py-2 rounded-full bg-black text-white text-sm hover:bg-black/80 transition"
              >
                Clear Search
              </a>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProductsList;