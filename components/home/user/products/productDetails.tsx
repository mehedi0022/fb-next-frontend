"use client";

import { useState } from "react";
import { Button } from "antd";
import {
  BadgeDollarSign,
  CheckCircle2,
  CircleDollarSign,
  Layers3,
  Package,
  ShieldCheck,
  TrendingUp,
  Truck,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  ZoomIn,
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
  const [wishlist, setWishlist] = useState(false);
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
    (v) => v.attributes.length > 0,
  );
  const youtubeEmbedUrl = getYouTubeEmbedUrl(product.videoUrl);

  const prevImage = () =>
    setActiveImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  const nextImage = () =>
    setActiveImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hover:text-sky-600 cursor-pointer transition-colors">
              Home
            </span>
            <span>/</span>
            <span className="hover:text-sky-600 cursor-pointer transition-colors">
              {product.category || "Products"}
            </span>
            <span>/</span>
            <span className="text-slate-700 font-medium truncate max-w-[200px]">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-12">
          {/* ── LEFT: Image Gallery ── */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-100">
              {activeImageUrl ? (
                <>
                  <Image
                    src={activeImageUrl}
                    alt={product.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Overlay controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white">
                    <ZoomIn size={16} className="text-slate-600" />
                  </button>
                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white">
                        <ChevronLeft size={18} className="text-slate-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white">
                        <ChevronRight size={18} className="text-slate-700" />
                      </button>
                    </>
                  )}
                  {/* Image counter */}
                  {gallery.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      {activeImage + 1} / {gallery.length}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-slate-400 flex-col gap-2">
                  <Package size={40} className="text-slate-200" />
                  <span>No image available</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {gallery.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                      activeImage === index
                        ? "border-sky-500 shadow-md shadow-sky-100 scale-105"
                        : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                    }`}>
                    <Image
                      src={img}
                      alt={`thumbnail ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* YouTube Video */}
            {youtubeEmbedUrl && (
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="inline-block w-1 h-4 bg-sky-500 rounded-full" />
                  Product Video
                </h3>
                <div className="aspect-video overflow-hidden rounded-xl bg-slate-100">
                  <iframe
                    className="h-full w-full"
                    src={youtubeEmbedUrl}
                    title={`${product.title} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 border border-sky-100 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    {product.category || "General"}
                  </span>
                  <h1 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl xl:text-4xl">
                    {product.title}
                  </h1>
                </div>
                <div className="flex gap-2 flex-shrink-0 mt-1">
                  <button
                    onClick={() => setWishlist(!wishlist)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      wishlist
                        ? "bg-rose-50 border-rose-200 text-rose-500"
                        : "bg-white border-slate-200 text-slate-400 hover:border-rose-200 hover:text-rose-400"
                    }`}>
                    <Heart
                      size={18}
                      fill={wishlist ? "currentColor" : "none"}
                    />
                  </button>
                  <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:border-sky-200 hover:text-sky-500 transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* SKU + Stock */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="text-xs text-slate-400 font-mono bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  SKU: {sku}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md ${
                    stock > 0
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-red-50 text-red-600 border border-red-100"
                  }`}>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
                  />
                  {stock > 0 ? `In Stock (${stock} units)` : "Out of Stock"}
                </span>
              </div>

              {/* Short description */}
              {product.shortDescription && (
                <p className="mt-4 text-sm leading-relaxed text-slate-500 border-l-2 border-sky-200 pl-3">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* Pricing */}
            {auth ? (
              <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Pricing Breakdown
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white border border-sky-100 p-3 text-center shadow-sm">
                    <BadgeDollarSign
                      size={16}
                      className="mx-auto mb-1 text-sky-500"
                    />
                    <p className="text-xs text-slate-400 mb-1">Wholesale</p>
                    <p className="text-base font-bold text-sky-700">
                      {formatPrice(wholesale, currency)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-emerald-100 p-3 text-center shadow-sm">
                    <CircleDollarSign
                      size={16}
                      className="mx-auto mb-1 text-emerald-500"
                    />
                    <p className="text-xs text-slate-400 mb-1">Sale Price</p>
                    <p className="text-base font-bold text-emerald-700">
                      {formatPrice(sale, currency)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 p-3 text-center shadow-sm">
                    <TrendingUp
                      size={16}
                      className="mx-auto mb-1 text-violet-200"
                    />
                    <p className="text-xs text-violet-200 mb-1">Est. Profit</p>
                    <p className="text-base font-bold text-white">
                      {formatPrice(profit, currency)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/50 p-5 text-center">
                <Package size={28} className="mx-auto mb-2 text-sky-300" />
                <p className="text-sm text-slate-500 mb-3">
                  Login to view pricing & stock details
                </p>
                <Button
                  type="primary"
                  size="large"
                  className="!rounded-xl !px-8">
                  Login to View Prices
                </Button>
              </div>
            )}

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white border border-slate-100 p-3 shadow-sm">
                <p className="text-xs text-slate-400 mb-1">Category</p>
                <p className="text-sm font-semibold text-slate-800">
                  {product.category || "—"}
                </p>
              </div>
              <div className="rounded-xl bg-white border border-slate-100 p-3 shadow-sm">
                <p className="text-xs text-slate-400 mb-1">Brand</p>
                <p className="text-sm font-semibold text-slate-800">
                  {product.brand || "—"}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                <Truck size={12} /> Ready to Ship
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                <CheckCircle2 size={12} /> Verified Product
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                <ShieldCheck size={12} /> Quality Checked
              </span>
            </div>

            {/* Variants */}
            {hasRealVariants && (
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <Layers3 size={15} className="text-sky-500" />
                  <p className="text-sm font-semibold text-slate-800">
                    Select Variation
                  </p>
                  <span className="ml-auto text-xs text-slate-400">
                    {product.variants?.length} options
                  </span>
                </div>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {(product.variants ?? []).map((variant, index) => (
                    <button
                      key={`${variant.sku}-${index}`}
                      type="button"
                      onClick={() => setActiveVariant(index)}
                      className={`w-full rounded-xl border p-3 text-left transition-all duration-200 ${
                        activeVariant === index
                          ? "border-sky-400 bg-sky-50 shadow-sm shadow-sky-100"
                          : "border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-slate-50"
                      }`}>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mb-2">
                        <span className="font-mono">
                          <strong>SKU:</strong> {variant.sku}
                        </span>
                        <span>
                          <strong>Stock:</strong> {variant.stock}
                        </span>
                        {auth && (
                          <>
                            <span>
                              <strong>WS:</strong>{" "}
                              {formatPrice(variant.wholesalePrice, currency)}
                            </span>
                            <span>
                              <strong>Sale:</strong>{" "}
                              {formatPrice(variant.suggestedPrice, currency)}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {variant.attributes.map((attr, i) => (
                          <span
                            key={i}
                            className="inline-block bg-white border border-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-md">
                            {attr.attributeName}:{" "}
                            <strong>{attr.valueName}</strong>
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trust badge */}
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <ShieldCheck size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  Quality Guaranteed
                </p>
                <p className="text-xs text-emerald-600">
                  Every product is quality checked and listing-ready.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Description Section ── */}
        <div className="mt-10">
          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
            {/* Section Header */}
            <div className="border-b border-slate-100 px-6 py-4 bg-gradient-to-r from-slate-50 to-white">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <span className="inline-block w-1 h-5 bg-sky-500 rounded-full" />
                Product Description
              </h2>
            </div>
            <div className="p-6">
              <div
                className="prose prose-slate max-w-none
                  prose-headings:font-bold prose-headings:text-slate-900
                  prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base
                  prose-p:text-slate-600 prose-p:leading-relaxed
                  prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-800
                  prose-ul:text-slate-600 prose-ol:text-slate-600
                  prose-li:my-1
                  prose-hr:border-slate-100"
                dangerouslySetInnerHTML={{
                  __html:
                    product.description ||
                    product.shortDescription ||
                    "<p class='text-slate-400'>No description available.</p>",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
