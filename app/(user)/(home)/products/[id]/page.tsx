"use client";

import React from "react";
import { ProductDetails, ProductDetailsSkeleton } from "@/components/home";
import { useGetSingleProductQuery } from "@/appstore/modules/products/api";
import type { Product } from "@/lib/home";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useGetSingleProductQuery(params.id);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  const siteBaseUrl = apiUrl.replace(/\/api\/v\d+$/i, "");
  const resolveAssetUrl = (url?: string | null) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
    return `${siteBaseUrl}${normalizedUrl}`;
  };

  const raw = data?.data;
  const firstVariant = raw?.variants?.[0];
  const sku = firstVariant?.sku ?? "";
  const wholesale = firstVariant?.wholesalePrice ?? 0;
  const sale = firstVariant?.suggestedPrice ?? 0;
  const stock = (raw?.variants ?? []).reduce((sum, item) => sum + item.stock, 0);
  const thumbnail = resolveAssetUrl(raw?.coverImage ?? "");
  const gallery = (raw?.images ?? []).map((item) => resolveAssetUrl(item.url));

  const product: Product | null = raw
    ? {
        id: String(raw.id),
        sku,
        title: raw.name,
        slug: raw.slug,
        description: raw.description ?? "",
        price: {
          wholesale,
          sale,
          shipping: 0,
          profit: sale - wholesale,
          currency: "BDT",
        },
        stock,
        isInStock: stock > 0,
        thumbnail,
        images: gallery.length > 0 ? gallery : thumbnail ? [thumbnail] : [],
        category: raw.category?.name ?? "",
        brand: raw.brand?.name,
        createdAt: "",
      }
    : null;

  if (isLoading) return <ProductDetailsSkeleton />;
  if (isError || !product) {
    return <div className="p-6 text-center text-red-500">Product not found.</div>;
  }

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsPage;
