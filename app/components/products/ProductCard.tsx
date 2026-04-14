import { Product } from "@/app/types/productTypes";
import React from "react";
import { Button } from "antd";
import Link from "next/link";

export default function ProductCard({
  product,
  isLoggedIn,
}: {
  product: Product;
  isLoggedIn: boolean;
}) {
  const { wholesale, sale, shipping = 0 } = product.price;

  return (
    <div className="w-full h-full flex flex-col bg-white border border-gray-200 rounded-xl hover:shadow-md transition overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <figure className="border-b-gray-200 border-b-2 rounded-lg overflow-hidden">
          {/* Image */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full aspect-square  object-cover "
          />
        </figure>
      </Link>

      <div className="p-3 mt-auto">
        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="mt-2 text-sm font-medium line-clamp-1">
            {product.title}
          </h3>
        </Link>

        {/* Before Login */}
        {!isLoggedIn && (
          <div className="mt-3 space-y-2">
            <button className="w-full text-sm text-primary">
              বিস্তারিত জানতে
            </button>

            <Link href="/auth/register" className="inline-block w-full">
              <Button
                type="primary"
                size="large"
                className="w-full font-tiro-bangla"
              >
                রেজিস্ট্রেশন করুন
              </Button>
            </Link>
          </div>
        )}

        {/* After Login */}
        {isLoggedIn && (
          <div className="mt-3 space-y-2 text-sm">
            <p>
              Wholesale <span className="font-semibold">{wholesale} ৳</span>
            </p>

            <p>
              Sale <span className="text-red-500 font-semibold">{sale} ৳</span>
            </p>

            <div className="bg-yellow-400 text-center py-1 rounded-full text-xs">
              Drop Shipping {shipping} ৳
            </div>

            <Link
              href={`/products/${product.id}`}
              className="inline-block w-full"
            >
              <Button size="large" type="primary" className="w-full">
                View Details
              </Button>
            </Link>

            <Button size="large" className="w-full border py-2 rounded-md">
              Add Product
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
