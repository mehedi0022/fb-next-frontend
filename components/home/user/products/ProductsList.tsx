"use client";

import { SearchParamsProps } from "@/lib/home";
import { useGetAllProductsQuery } from "@/appstore/modules/products/api";
import { useGetSellerProductsQuery } from "@/appstore/modules/seller/panel.api";
import { useGetSellerCategoriesQuery } from "@/appstore/modules/seller/panel.api";
import { useAppSelector } from "@/appstore/hooks/hooks";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "@/appstore/slices/sessionSlice";
import React, { Suspense } from "react";
import Container from "../../common/Container";
import Title from "../../common/Title";
import SearchProduct from "./SearchProduct";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/home";

interface ProductsListProps {
  searchParams: SearchParamsProps;
}

const ProductsList: React.FC<ProductsListProps> = ({ searchParams }) => {
  const search = searchParams?.product || "";
  const categoryIdParam = Number(searchParams?.categoryId);
  const selectedCategoryId = Number.isInteger(categoryIdParam) && categoryIdParam > 0
    ? categoryIdParam
    : undefined;
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRole = useAppSelector(selectUserRole);
  const isSeller = isAuthenticated && userRole === "seller";

  const { data, isLoading, isError } = useGetAllProductsQuery({
    search,
    categoryId: selectedCategoryId,
    isActive: true,
    limit: 100,
  });

  const { data: sellerProductsData } = useGetSellerProductsQuery(
    {
      page: 1,
      limit: 1000,
    },
    { skip: !isSeller },
  );
  const { data: sellerCategoriesData } = useGetSellerCategoriesQuery(
    { status: "active" },
    { skip: !isSeller },
  );

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  const siteBaseUrl = apiUrl.replace(/\/api\/v\d+$/i, "");
  const resolveAssetUrl = (url?: string | null) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
    return `${siteBaseUrl}${normalizedUrl}`;
  };

  const products: Product[] = (data?.data ?? []).map((item) => {
    const salePrice =
      item.suggestedPrice?.type === "fixed"
        ? item.suggestedPrice.value
        : (item.suggestedPrice?.max ?? 0);
    const wholesale = item.wholesalePrice ?? 0;
    const thumbnail = resolveAssetUrl(item.coverImage ?? item.thumbnail ?? "");

    return {
      id: String(item.id),
      categoryId: item.category?.id,
      title: item.name,
      slug: item.slug,
      shortDescription: item.shortDescription ?? "",
      description: item.shortDescription ?? "",
      price: {
        wholesale,
        sale: salePrice,
        shipping: 0,
        profit: salePrice - wholesale,
        currency: "BDT",
      },
      stock: item.totalStock ?? 0,
      isInStock: (item.totalStock ?? 0) > 0,
      thumbnail,
      images: thumbnail ? [thumbnail] : [],
      category: item.category?.name ?? "",
      brand: item.brand?.name,
      createdAt: item.createdAt ?? "",
    };
  });

  const sellerProductByProductId = new Map(
    (sellerProductsData?.data ?? []).map((item) => [item.productId, item.id]),
  );
  const activeSellerCategoryIds = new Set(
    (sellerCategoriesData?.data ?? []).map((item) => item.categoryId),
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
        {selectedCategoryId && (
          <p className="text-sm text-gray-500 mt-1">
            Filtered by category ID: {selectedCategoryId}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-7">
          {!isLoading && !isError && products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              existingSellerProductId={sellerProductByProductId.get(Number(product.id))}
              hasActiveSellerCategory={
                product.categoryId ? activeSellerCategoryIds.has(product.categoryId) : false
              }
            />
          ))}

          {!isLoading && products.length === 0 && (
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
          {isLoading && (
            <div className="col-span-full text-center text-sm text-gray-500 py-10">
              Loading products...
            </div>
          )}
          {isError && (
            <div className="col-span-full text-center text-sm text-red-500 py-10">
              Failed to load products.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProductsList;
