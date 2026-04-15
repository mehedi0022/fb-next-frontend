import { Product } from "@/app/types/productTypes";
import React from "react";
import { Button } from "antd";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ProductCard({
  product,
  isLoggedIn,
}: {
  product: Product;
  isLoggedIn: boolean;
}) {
  const { wholesale, sale, shipping = 0 } = product.price;

  return (
    <div className="w-full h-full flex flex-col bg-white border  rounded-sm hover:shadow-md transition overflow-hidden border-gray-400">
      <div className=" m-2 border border-gray-400 rounded-sm">
        <Link href={`/products/${product.id}`}>
          <figure className="border-b-gray-400 border-b-2  overflow-hidden p-2">
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

              <Button
                size="large"
                className="w-full bg-neutral-900 hover:bg-black text-white flex items-center justify-center gap-2 py-6 rounded-xl shadow-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Add Product</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
