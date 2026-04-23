'use client';

import { ProductCardProps } from "@/lib/home";
import { Button, message } from "antd";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/appstore/hooks/hooks";
import { selectIsAuthenticated } from "@/appstore/slices/sessionSlice";



export default function ProductCard({
  product,
}: ProductCardProps) {
  const { wholesale, sale, shipping = 0 } = product.price || {};
  const router = useRouter();
  const auth = useAppSelector(selectIsAuthenticated);
  
  // Use isLoggedIn prop if provided, otherwise fall back to Redux auth state

  const handleAddProduct = () => {


    if (!auth) {
      message.warning('প্রোডাক্ট যোগ করতে লগইন করুন');
      router.push('/auth/login');
      return;
    }

    message.success('প্রোডাক্ট যোগ হয়েছে!');
  };

  return (
    <div className="group h-full flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
      {/* Image Container - Fixed Aspect Ratio */}
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden bg-gray-100">
        <div className="relative w-full aspect-square">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Content Container - Flex Grow */}
      <div className="flex-1 flex flex-col p-4">
        {/* Title Section - Fixed Height */}
        <div className="mb-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors leading-snug h-10">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-4" />

        {/* Dynamic Content - Flex Grow */}
        <div className="flex-1 flex flex-col">
          {/* BEFORE LOGIN */}
          {!auth && (
            <div className="flex flex-col justify-end gap-3">
              <div className="text-center py-6">
                <p className="text-sm text-gray-500 mb-2">দাম দেখতে লগইন করুন</p>
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 underline"
                >
                  বিস্তারিত দেখুন →
                </button>
              </div>
              <Link href="/auth/register">
                <Button
                  type="primary"
                  size="large"
                  className="w-full h-10 font-medium"
                  block
                >
                  রেজিস্ট্রেশন করুন
                </Button>
              </Link>
            </div>
          )}

          {/* AFTER LOGIN */}
          {auth && (
            <div className="flex flex-col gap-3">
              {/* Price Section - Structured Grid */}
              <div className="space-y-2">
                {/* Wholesale Price */}
                <div className="flex items-center justify-between p-2.5 bg-blue-50 border border-blue-100 rounded">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Wholesale</span>
                  <span className="text-base font-bold text-blue-700">{wholesale}৳</span>
                </div>

                {/* Sale Price */}
                <div className="flex items-center justify-between p-2.5 bg-red-50 border border-red-100 rounded">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Sale Price</span>
                  <span className="text-base font-bold text-red-600">{sale}৳</span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">🚚 Shipping</span>
                  <span className="text-base font-bold text-amber-700">{shipping}৳</span>
                </div>
              </div>

              {/* Action Buttons - Fixed at Bottom */}
              <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
                <Link href={`/products/${product.id}`}>
                  <Button
                    size="middle"
                    className="w-full h-9 border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 font-medium"
                    block
                  >
                    Details
                  </Button>
                </Link>
                <Button
                  size="middle"
                  onClick={handleAddProduct}
                  className="w-full h-9 bg-gray-900 hover:bg-gray-800 text-white font-medium flex items-center justify-center gap-1 border-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}