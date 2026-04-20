import { ProductCardProps } from "@/lib/home";
import React from "react";
import { Button } from "antd";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function ProductCard({
  product,
  isLoggedIn,
}: ProductCardProps) {
  const { wholesale, sale, shipping = 0 } = product.price || {};

  return (
    <div className="w-full h-full flex flex-col bg-white border border-gray-400 rounded-sm hover:shadow-md transition overflow-hidden">
      {/* Image Section */}
      <div className="m-2 border border-gray-400 rounded-sm overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <figure className="border-b border-gray-300 p-2 hover:scale-105 transition-transform duration-300">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={300}
              height={300}
              className="w-full aspect-square object-cover"
              priority={false}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />
          </figure>
        </Link>

        {/* Content */}
        <div className="p-3 flex flex-col gap-2">
          {/* Title */}
          <Link href={`/products/${product.id}`}>
            <h3 className="text-sm font-medium line-clamp-2 hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* BEFORE LOGIN */}
          {!isLoggedIn && (
            <div className="mt-2 space-y-2">
              <button 
                type="button"
                className="w-full text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                বিস্তারিত জানতে
              </button>

              <Link href="/auth/register" className="block">
                <Button 
                  type="primary" 
                  size="large" 
                  className="w-full"
                  block
                >
                  রেজিস্ট্রেশন করুন
                </Button>
              </Link>
            </div>
          )}

          {/* AFTER LOGIN */}
          {isLoggedIn && (
            <div className="mt-2 space-y-2 text-sm">
              {/* Wholesale Price */}
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <span className="text-gray-600">Wholesale</span>
                <span className="font-semibold text-gray-900">
                  {wholesale} ৳
                </span>
              </div>

              {/* Sale Price */}
              <div className="flex justify-between items-center p-2 bg-red-50 rounded hover:bg-red-100 transition-colors">
                <span className="text-gray-600">Sale</span>
                <span className="font-semibold text-red-600">
                  {sale} ৳
                </span>
              </div>

              {/* Shipping Cost */}
              <div className="bg-yellow-400 text-center py-1 rounded-full text-xs font-medium hover:bg-yellow-500 transition-colors cursor-default">
                Drop Shipping {shipping} ৳
              </div>

              {/* View Details Button */}
              <Link href={`/products/${product.id}`} className="block">
                <Button 
                  size="large" 
                  type="primary" 
                  className="w-full"
                  block
                >
                  View Details
                </Button>
              </Link>

              {/* Add Product Button */}
              <Button
                size="large"
                className="w-full bg-neutral-900 hover:bg-black text-white flex items-center justify-center gap-2 border-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}