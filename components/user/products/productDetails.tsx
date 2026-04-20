"use client";

import { useState } from "react";
import { Button, Tag } from "antd";
import { Package } from "lucide-react";
import { Product } from "@/lib";
import Image from "next/image";

export default function ProductDetails({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const isLogin = true;
  const gallery =
    product.images?.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-3 gap-6">
      {/* LEFT  */}
      <div className="space-y-4 border-2 rounded-xl border-gray-300">
        {/* Main Image */}
        <div className="bg-gray-100 border-gray-300 border-2 p-4 rounded-xl overflow-hidden">
          <Image
            src={gallery[active]}
            alt={product.title}
            width={400}
            height={400}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 p-4">
          {gallery.map((img: string, i: number) => (
            <Image
              key={i}
              src={img}
              alt="thumb"
              width={56}
              height={56}
              onClick={() => setActive(i)}
              className={`w-14 h-14 object-cover cursor-pointer rounded-md border ${
                active === i ? "border-blue-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        <hr className="border-gray-300" />

        {/* Default YouTube Video */}
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-2">Product Video</h3>

          <iframe
            className="w-full h-[180px] rounded-lg border border-gray-300"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Product Video"
            allowFullScreen
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="border-2 border-gray-300 rounded-xl p-4 bg-white space-y-3 md:col-span-2">
        <h1 className="text-lg font-bold">{product.title}</h1>

        <p className="text-sm text-gray-500">Category: {product.category}</p>

        {isLogin ? (
          <>
            {/* Price */}
            <div className="space-y-1 text-sm">
              <p>
                Wholesale:{" "}
                <span className="text-green-600 font-semibold">
                  {product.price.wholesale} {product.price.currency}
                </span>
              </p>

              <p>
                Sale:{" "}
                <span className="text-red-500 font-semibold">
                  {product.price.sale} {product.price.currency}
                </span>
              </p>

              <p>
                Shipping:{" "}
                <Tag color="orange">
                  {product.price.shipping} {product.price.currency}
                </Tag>
              </p>
            </div>

            {/* Stock */}
            <div>
              <Tag color={product.isInStock ? "green" : "red"}>
                <span className="flex items-center gap-1">
                  <Package size={14} />
                  {product.isInStock
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </span>
              </Tag>
            </div>
          </>
        ) : (
          <Button type="primary" size="large" className="w-full">
            <span className="flex items-center gap-2">
              <Package size={16} /> Login to see price & stock
            </span>
          </Button>
        )}

        {/* ID */}
        <p className="text-sm">
          ID: <span className="font-semibold">{product.id}</span>
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>
    </div>
  );
}
