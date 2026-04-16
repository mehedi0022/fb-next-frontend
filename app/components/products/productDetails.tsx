"use client";

import { useState } from "react";
import { Button, Tag } from "antd";
import { Package } from "lucide-react";
import { Product } from "@/app/types/productTypes";

export default function ProductDetails({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const isLogin = true;
  const gallery =
    product.images?.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-3 gap-6">
      {/* LEFT  */}
      <div className="space-y-4 ">
        {/* Main Image */}
        <div className="bg-gray-100 border-gray-100 border-2 rounded-xl overflow-hidden ">
          <img
            src={gallery[active]}
            alt={product.title}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2">
          {gallery.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              alt="thumb"
              onClick={() => setActive(i)}
              className={`w-14 h-14 object-cover cursor-pointer rounded-md border ${
                active === i ? "border-blue-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Default YouTube Video */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Product Video</h3>

          <iframe
            className="w-full h-[180px] rounded-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Product Video"
            allowFullScreen
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="border rounded-xl p-4 bg-white space-y-3 md:col-span-2">
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
