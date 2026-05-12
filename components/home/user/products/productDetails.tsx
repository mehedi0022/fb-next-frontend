"use client";

import { useState } from "react";
import { Button, Tag } from "antd";
import {
  Package,
  ShieldCheck,
  BadgeDollarSign,
  // CircleDollarSign,
  TrendingUp,
  Truck,
  // CheckCircle2,
  Verified,
  Banknote,
} from "lucide-react";
import { Product } from "@/lib/home";
import Image from "next/image";
import { useAppSelector } from "@/appstore/hooks/hooks";
import { selectIsAuthenticated } from "@/appstore/slices/sessionSlice";

export default function ProductDetails({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const auth = useAppSelector(selectIsAuthenticated);
  const gallery =
    product.images?.length > 0 ? product.images : [product.thumbnail];
  const profit =
    product.price.profit ?? product.price.sale - product.price.wholesale;

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-3 md:p-4 shadow-sm">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={gallery[active]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {gallery.map((img: string, i: number) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                    active === i
                      ? "border-sky-500"
                      : "border-slate-200 hover:border-slate-300"
                  }`}>
                  <Image
                    src={img}
                    alt={`${product.title} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {product.title}
              </h1>
              <div className="mt-2 text-sm text-slate-500">
                {product.sku || "-"}
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-6">
                {product.description ||
                  "No additional product summary available."}
              </p>
            </div>

            {auth ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
                  <p className="text-xs text-sky-700 mb-1 flex items-center gap-1">
                    <BadgeDollarSign size={14} />
                    Wholesale
                  </p>
                  <p className="text-xl font-bold text-sky-900">
                    {product.price.wholesale}
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <p className="text-xs text-emerald-700 mb-1 flex items-center gap-1">
                    <Banknote size={14} />
                    Sale Price
                  </p>
                  <p className="text-xl font-bold text-emerald-900">
                    {product.price.sale}
                  </p>
                </div>

                <div className="rounded-xl border border-violet-200 bg-violet-50 p-3">
                  <p className="text-xs text-violet-700 mb-1 flex items-center gap-1">
                    <TrendingUp size={14} />
                    Estimated Profit
                  </p>
                  <p className="text-xl font-bold text-violet-900">{profit}</p>
                </div>
              </div>
            ) : (
              <Button
                type="primary"
                size="large"
                className="w-full !h-11 !rounded-xl">
                <span className="flex items-center gap-2">
                  <Package size={16} /> Login to see price & stock
                </span>
              </Button>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <Tag
                color={product.isInStock ? "green" : "red"}
                className="!px-3 !py-1">
                <span className="flex items-center gap-1">
                  <Package size={14} />
                  {product.isInStock
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
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
                  <Verified size={14} />
                  Verified Product
                </span>
              </Tag>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-xs text-slate-500 mb-1">Category</p>
                <p className="text-sm font-semibold text-slate-900">
                  {product.category || "-"}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-xs text-slate-500 mb-1">Brand</p>
                <p className="text-sm font-semibold text-slate-900">
                  {product.brand || "-"}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 flex items-center gap-2">
              <ShieldCheck size={16} />
              Quality checked and listing-ready.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
