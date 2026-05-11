import { Product, SearchParamsProps } from "@/lib/home";
import React, { Suspense } from "react";
import Container from "../../common/Container";
import Title from "../../common/Title";
import SearchProduct from "./SearchProduct";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  searchParams: SearchParamsProps;
}

const ProductsList: React.FC<ProductsListProps> = ({ searchParams }) => {
  const search = searchParams?.product || "";
  const searchText = search.trim().toLowerCase();

  const sampleProducts = [
    {
      title: "Luxury Smart Fitness Watch",
      slug: "luxury-smart-fitness-watch",
      description: "Premium waterproof smartwatch with heart rate monitor and AMOLED display.",
      price: {
        wholesale: 3200,
        sale: 4990,
        shipping: 120,
        profit: 1790,
        currency: "BDT" as const,
      },
      stock: 80,
      isInStock: true,
      thumbnail:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      ],
      category: "Gadgets",
      createdAt: "2026-04-01T10:00:00Z",
    },

    {
      title: "Premium Wireless Headphones",
      slug: "premium-wireless-headphones",
      description: "Noise cancelling over-ear headphones with deep bass and crystal-clear sound.",
      price: {
        wholesale: 2800,
        sale: 4500,
        shipping: 100,
        profit: 1700,
        currency: "BDT" as const,
      },
      stock: 60,
      isInStock: true,
      thumbnail:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      ],
      category: "Audio",
      createdAt: "2026-04-02T12:00:00Z",
    },

    {
      title: "Professional Leather Backpack",
      slug: "professional-leather-backpack",
      description: "Elegant leather backpack for office, travel, and premium lifestyle.",
      price: {
        wholesale: 2200,
        sale: 3890,
        shipping: 150,
        profit: 1690,
        currency: "BDT" as const,
      },
      stock: 45,
      isInStock: true,
      thumbnail:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
      ],
      category: "Fashion",
      createdAt: "2026-04-03T09:30:00Z",
    },

    {
      title: "Portable Premium Coffee Maker",
      slug: "portable-premium-coffee-maker",
      description: "Compact coffee maker for home, office, and travel with rich espresso taste.",
      price: {
        wholesale: 3500,
        sale: 5990,
        shipping: 180,
        profit: 2490,
        currency: "BDT" as const,
      },
      stock: 35,
      isInStock: true,
      thumbnail:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      ],
      category: "Kitchen",
      createdAt: "2026-04-04T11:15:00Z",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
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