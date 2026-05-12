"use client";

import { useState } from "react";
import { Button, Tag } from "antd";
import {
  BadgeDollarSign,
  CheckCircle2,
  CircleDollarSign,
  Layers3,
  Package,
  ShieldCheck,
  TrendingUp,
  Truck,
} from "lucide-react";
import type { Product } from "@/lib/home";
import Image from "next/image";
import { useAppSelector } from "@/appstore/hooks/hooks";
import { selectIsAuthenticated } from "@/appstore/slices/sessionSlice";

const formatPrice = (value: number, currency = "BDT") =>
  `${currency} ${Number(value || 0).toLocaleString("en-US")}`;

const getYouTubeEmbedUrl = (url?: string | null) => {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) return url;
      const videoId = parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }
  } catch {
    return "";
  }

  return "";
};

export default function ProductDetails({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);
  const auth = useAppSelector(selectIsAuthenticated);
  const gallery = Array.from(
    new Set([...(product.images ?? []), product.thumbnail].filter(Boolean)),
  );
  const selectedVariant = product.variants?.[activeVariant];
  const activeImageUrl = gallery[activeImage];

  const sku = selectedVariant?.sku || product.sku || "-";
  const stock = selectedVariant?.stock ?? product.stock;
  const wholesale = selectedVariant?.wholesalePrice ?? product.price.wholesale;
  const sale = selectedVariant?.suggestedPrice ?? product.price.sale;
  const profit = sale - wholesale;
  const currency = product.price.currency || "BDT";
  const hasRealVariants = (product.variants ?? []).some(
    (variant) => variant.attributes.length > 0,
  );
  const youtubeEmbedUrl = getYouTubeEmbedUrl(product.videoUrl);

  return (
    <section className="bg-slate-50 py-8 md:py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:p-4">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
              {activeImageUrl ? (
                <Image
                  src={activeImageUrl}
                  alt={product.title}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                  No image available
                </div>
              )}
            </div>
          </div>

          {gallery.length > 1 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8">
                {gallery.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                      activeImage === index
                        ? "border-sky-500"
                        : "border-slate-200 hover:border-slate-300"
                    }`}>
                    <Image
                      src={img}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {youtubeEmbedUrl ? (
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-base font-semibold text-slate-900">
                Product Video
              </h2>
              <div className="aspect-video overflow-hidden rounded-lg bg-slate-100">
                <iframe
                  className="h-full w-full"
                  src={youtubeEmbedUrl}
                  title={`${product.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          ) : null}

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-base font-semibold text-slate-900">
              Product Description
            </h2>
            <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
              {product.description || product.shortDescription || "No description available."}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                {product.category || "General"}
              </p>
              <h1 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                {product.title}
              </h1>
              <div className="mt-2 text-sm text-slate-500">SKU: {sku}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {product.shortDescription || "No product summary available."}
              </p>
            </div>

            {auth ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
                  <p className="mb-1 flex items-center gap-1 text-xs text-sky-700">
                    <BadgeDollarSign size={14} />
                    Wholesale
                  </p>
                  <p className="text-xl font-bold text-sky-900">
                    {formatPrice(wholesale, currency)}
                  </p>
                </div>

                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                  <p className="mb-1 flex items-center gap-1 text-xs text-emerald-700">
                    <CircleDollarSign size={14} />
                    Sale Price
                  </p>
                  <p className="text-xl font-bold text-emerald-900">
                    {formatPrice(sale, currency)}
                  </p>
                </div>

                <div className="rounded-lg border border-violet-200 bg-violet-50 p-3 sm:col-span-2">
                  <p className="mb-1 flex items-center gap-1 text-xs text-violet-700">
                    <TrendingUp size={14} />
                    Estimated Profit
                  </p>
                  <p className="text-xl font-bold text-violet-900">
                    {formatPrice(profit, currency)}
                  </p>
                </div>
              </div>
            ) : (
              <Button type="primary" size="large" className="w-full !h-11 !rounded-xl">
                <span className="flex items-center gap-2">
                  <Package size={16} /> Login to see price and stock
                </span>
              </Button>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <Tag color={stock > 0 ? "green" : "red"} className="!px-3 !py-1">
                <span className="flex items-center gap-1">
                  <Package size={14} />
                  {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
                </span>
              </Tag>
              <Tag color="blue" className="!px-3 !py-1">
                <span className="flex items-center gap-1">
                  <Truck size={14} />
                  Ready to Ship
                </span>
              </Tag>
              <Tag color="purple" className="!px-3 !py-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={14} />
                  Verified Product
                </span>
              </Tag>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="mb-1 text-xs text-slate-500">Category</p>
                <p className="text-sm font-semibold text-slate-900">
                  {product.category || "-"}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="mb-1 text-xs text-slate-500">Brand</p>
                <p className="text-sm font-semibold text-slate-900">
                  {product.brand || "-"}
                </p>
              </div>
            </div>

            {hasRealVariants ? (
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-3 flex items-center gap-2">
                  <Layers3 size={16} className="text-sky-600" />
                  <p className="text-sm font-semibold text-slate-900">
                    Select Variation
                  </p>
                </div>
                <div className="space-y-2">
                  {(product.variants ?? []).map((variant, index) => (
                    <button
                      key={`${variant.sku}-${index}`}
                      type="button"
                      onClick={() => setActiveVariant(index)}
                      className={`w-full rounded-lg border p-3 text-left transition ${
                        activeVariant === index
                          ? "border-sky-400 bg-sky-50"
                          : "border-slate-100 bg-slate-50 hover:border-slate-200"
                      }`}>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700">
                        <span>
                          <strong>SKU:</strong> {variant.sku}
                        </span>
                        <span>
                          <strong>Stock:</strong> {variant.stock}
                        </span>
                        {auth && (
                          <>
                            <span>
                              <strong>Wholesale:</strong>{" "}
                              {formatPrice(variant.wholesalePrice, currency)}
                            </span>
                            <span>
                              <strong>Sale:</strong>{" "}
                              {formatPrice(variant.suggestedPrice, currency)}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {variant.attributes.map((attr, attrIndex) => (
                          <Tag key={`${variant.sku}-${attrIndex}`} color="geekblue">
                            {attr.attributeName}: {attr.valueName}
                          </Tag>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
              <ShieldCheck size={16} />
              Quality checked and listing-ready.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
