'use client';

import { ProductCardProps } from "@/lib/home";
import { message } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/appstore/hooks/hooks";
import { selectIsAuthenticated } from "@/appstore/slices/sessionSlice";
import {
  Store,
  Tag,
  Truck,
  Eye,
  Plus,
  Heart,
  Lock,
  // ShieldCheck,
  UserPlus,
} from "lucide-react";

export default function ProductCard({ product }: ProductCardProps) {
  const { wholesale, sale, shipping = 0 } = product.price || {};
  const router = useRouter();
  const auth = useAppSelector(selectIsAuthenticated);
  const handleAddProduct = () => {
    if (!auth) {
      message.warning("প্রোডাক্ট যোগ করতে লগইন করুন");
      router.push("/auth/login");
      return;
    }
    message.success("প্রোডাক্ট যোগ হয়েছে!");
  };

  return (
    <div
      className={`
        group flex flex-col bg-white rounded-2xl overflow-hidden
        border transition-all duration-300 cursor-pointer
        ${auth
          ? "border-gray-200 hover:border-blue-400 hover:-translate-y-1.5"
          : "border-gray-200 hover:border-violet-400 hover:-translate-y-1.5"
        }
      `}
    >
      {/* ── Image Zone ── */}
      <Link
        href={`/products/${product.id}`}
        className={`
          block relative overflow-hidden transition-colors duration-300
          ${auth ? "bg-blue-50 group-hover:bg-blue-100" : "bg-violet-50 group-hover:bg-violet-100"}
        `}
        style={{ aspectRatio: "4/3" }}
      >
        {/* Corner Badge */}
        <span
          className={`
            absolute top-0 left-0 z-10 text-[9px] font-medium tracking-wider px-2.5 py-1
            rounded-br-xl
            ${auth ? "bg-blue-500 text-blue-50" : "bg-violet-500 text-violet-50"}
          `}
        >
          {auth ? "Best Seller" : "নতুন"}
        </span>

        {/* Wishlist */}
        <button
          className={`
            absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white
            flex items-center justify-center border transition-all duration-200
            ${auth
              ? "border-gray-200 group-hover:border-blue-400 group-hover:text-blue-500 group-hover:scale-110"
              : "border-gray-200 group-hover:border-violet-400 group-hover:text-violet-500 group-hover:scale-110"
            }
          `}
          onClick={(e) => e.preventDefault()}
          aria-label="Wishlist"
        >
          <Heart className="w-3 h-3" />
        </button>

        {/* Product Image */}
        <div className="relative w-full h-full">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="
      object-cover
      w-full h-full
      group-hover:scale-105
      transition-transform duration-300
    "
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        </div>
        {/* Lock Overlay — logged out */}
        {!auth && (
          <div className="absolute inset-0 bg-violet-900/10 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-800 transition-transform duration-300 group-hover:scale-110">
              <Lock className="w-4 h-4" />
            </div>
          </div>
        )}
      </Link>

      {/* ── Body ── */}
      <div className="flex flex-col p-3 gap-2">

        {/* Title */}
        <div>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-[12.5px] font-medium text-gray-900 line-clamp-1 leading-snug hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {auth ? "In stock" : "রেজিস্টার্ড রিসেলারদের জন্য"}
          </p>
        </div>

        <div className="border-t border-gray-100" />

        {/* ── LOGGED IN ── */}
        {auth && (
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col gap-1">

              {/* Wholesale */}
              <div className="
                flex items-center justify-between px-2.5 py-1.5 rounded-lg
                bg-blue-200 border border-blue-100
                transition-all duration-300 ease-[cubic-bezier(.22,.68,0,1.2)]
                group-hover:translate-x-1 group-hover:scale-[1.02] group-hover:shadow-[0_0_0_2px_#BFDBFE]
                [transition-delay:0ms]
              ">
                <div className="flex items-center gap-1 text-[10px] text-gray-900 font-semibold">
                  <Store className="w-3 h-3 text-blue-600 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-125" />
                  পাইকারি
                </div>
                <span className="text-[12px] font-medium text-blue-800 transition-transform duration-300 group-hover:scale-110">
                  ৳{wholesale}
                </span>
              </div>

              {/* Sale Price */}
              <div className="
                flex items-center justify-between px-2.5 py-1.5 rounded-lg
                bg-violet-300 border border-violet-100
                transition-all duration-300 ease-[cubic-bezier(.22,.68,0,1.2)]
                group-hover:translate-x-1 group-hover:scale-[1.02] group-hover:shadow-[0_0_0_2px_#DDD6FE]
                group-hover:[transition-delay:60ms]
              ">
                <div className="flex items-center gap-1 text-[10px] text-gray-900 font-semibold">
                  <Tag className="w-3 h-3 text-violet-500 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-125" />
                  বিক্রয় মূল্য
                </div>
                <span className="text-[12px] font-medium text-violet-800 transition-transform duration-300 group-hover:scale-110">
                  ৳{sale}
                </span>
              </div>

              {/* Shipping */}
              <div className="
                flex items-center justify-between px-2.5 py-1.5 rounded-lg
                bg-gray-200 border border-gray-100
                transition-all duration-300 ease-[cubic-bezier(.22,.68,0,1.2)]
                group-hover:translate-x-1 group-hover:scale-[1.02] group-hover:shadow-[0_0_0_2px_#E5E7EB]
                group-hover:[transition-delay:120ms]
              ">
                <div className="flex items-center gap-1 text-[10px] text-gray-900 font-semibold">
                  <Truck className="w-3 h-3 text-gray-400 transition-transform duration-300 group-hover:translate-x-0.5" />
                  শিপিং
                </div>
                <span className="text-[12px] font-medium text-gray-500 transition-transform duration-300 group-hover:scale-105">
                  ৳{shipping}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              <Link href={`/products/${product.id}`} className="block">
                <button className="
                  w-full py-1.5 rounded-xl text-[11px] font-medium
                  border border-gray-200 text-gray-500 bg-white
                  flex items-center justify-center gap-1
                  transition-all duration-200
                  hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 active:scale-95
                  [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:rotate-12
                ">
                  <Eye className="w-3 h-3" />
                  বিস্তারিত
                </button>
              </Link>
              <button
                onClick={handleAddProduct}
                className="
                  relative overflow-hidden w-full py-1.5 rounded-xl text-[11px] font-medium
                  bg-blue-500 text-white border-none
                  flex items-center justify-center gap-1
                  transition-all duration-200 active:scale-95
                  before:absolute before:inset-0 before:bg-blue-700
                  before:translate-x-[-100%] before:transition-transform before:duration-[250ms]
                  hover:before:translate-x-0
                  [&>*]:relative [&>*]:z-10
                  [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:rotate-90
                "
              >
                <Plus className="w-3 h-3" />
                যোগ করুন
              </button>
            </div>
          </div>
        )}

        {/* ── LOGGED OUT — Purple Theme ── */}
        {!auth && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-1.5 py-1">
              {/* <div className="w-9 h-9 rounded-full bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-800 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="w-4 h-4" />
              </div> */}
              <p className="text-[11px] text-gray-900 text-center leading-snug">
                মূল্য দেখতে একাউন্ট তৈরি করুন
              </p>
              <Link
                href={`/products/${product.id}`}
                className="text-[11px] text-violet-800 font-medium transition-all duration-200 group-hover:tracking-wide"
              >
                বিস্তারিত দেখুন →
              </Link>
            </div>

            <Link href="/register" className="block">
              <button
                className="
                relative overflow-hidden w-full py-2 rounded-xl text-[11.5px] font-medium
                bg-violet-500 text-white border-none
                flex items-center justify-center gap-1.5
                transition-all duration-200 active:scale-95

                before:absolute before:inset-0 before:bg-violet-700
                before:translate-x-[-100%] before:transition-transform before:duration-[250ms]
                group-hover:before:translate-x-0

                hover:text-white
                group-hover:text-white

                [&>*]:relative [&>*]:z-10
                [&>svg]:transition-transform [&>svg]:duration-200
                group-hover:[&>svg]:translate-x-1
                group-hover:[&>svg]:text-white
    "
              >
                <UserPlus className="w-3.5 h-3.5 text-white" />
                <span className="text-white">রেজিস্ট্রেশন করুন</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}