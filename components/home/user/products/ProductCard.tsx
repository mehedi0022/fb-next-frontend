"use client";

import { useState } from "react";
import { ProductCardProps } from "@/lib/home";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { Button, InputNumber, Modal, Switch, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/appstore/hooks/hooks";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "@/appstore/slices/sessionSlice";
import {
  useCreateSellerProductMutation,
  useGetSellerProductByIdQuery,
  useUpdateSellerProductMutation,
} from "@/appstore/modules/seller/panel.api";
import { Store, Tag, Eye, Plus, Heart, Lock, UserPlus, Pencil } from "lucide-react";

export default function ProductCard({
  product,
  existingSellerProductId,
  hasActiveSellerCategory,
}: ProductCardProps) {
  const { wholesale, sale } = product.price || {};
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRole = useAppSelector(selectUserRole);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sellPrice, setSellPrice] = useState<number | null>(null);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [isHomePageView, setIsHomePageView] = useState(false);
  const [hotDeal, setHotDeal] = useState(false);
  const [topSelling, setTopSelling] = useState(false);

  const [createSellerProduct, { isLoading: isAddingProduct }] =
    useCreateSellerProductMutation();
  const [updateSellerProduct, { isLoading: isUpdatingProduct }] =
    useUpdateSellerProductMutation();

  const { data: existingSellerProductDetails } = useGetSellerProductByIdQuery(
    Number(existingSellerProductId),
    { skip: !existingSellerProductId },
  );

  const isAlreadyAdded = Boolean(existingSellerProductId);
  const isSubmitting = isAddingProduct || isUpdatingProduct;

  const resetAddProductFields = () => {
    setSellPrice(sale > 0 ? sale : null);
    setPreviousPrice(null);
    setIsHomePageView(false);
    setHotDeal(false);
    setTopSelling(false);
  };

  const setUpdateProductFields = () => {
    const existing = existingSellerProductDetails?.data;
    setSellPrice(existing?.price ?? (sale > 0 ? sale : null));
    setPreviousPrice(existing?.previousePrice ?? null);
    setIsHomePageView(Boolean(existing?.isHomePageView));
    setHotDeal(Boolean(existing?.hotDeal));
    setTopSelling(Boolean(existing?.topSelling));
  };

  const handleAddProductClick = () => {
    if (!isAuthenticated) {
      message.warning("প্রোডাক্ট যোগ করতে লগইন করুন");
      router.push("/login");
      return;
    }

    if (userRole !== "seller") {
      message.warning("শুধু Seller অ্যাকাউন্ট থেকে প্রোডাক্ট যোগ করা যাবে");
      return;
    }

    if (!isAlreadyAdded && !hasActiveSellerCategory) {
      message.warning("Please add this product category first from My Categories.");
      return;
    }

    if (isAlreadyAdded) {
      setUpdateProductFields();
    } else {
      resetAddProductFields();
    }

    setIsAddModalOpen(true);
  };

  const handleConfirmAddProduct = async () => {
    if (!sellPrice || sellPrice <= 0) {
      message.warning("Sell price দিন");
      return;
    }

    if (previousPrice !== null && previousPrice <= sellPrice) {
      message.warning("Previous price অবশ্যই Sell price থেকে বেশি হতে হবে");
      return;
    }

    const parsedProductId = Number(product.id);
    if (!Number.isInteger(parsedProductId) || parsedProductId <= 0) {
      message.error("Invalid product id");
      return;
    }

    try {
      if (isAlreadyAdded && existingSellerProductId) {
        await updateSellerProduct({
          id: existingSellerProductId,
          price: sellPrice,
          previousePrice: previousPrice ?? undefined,
          isHomePageView,
          hotDeal,
          topSelling,
        }).unwrap();

        message.success("Seller panel product updated successfully");
        setIsAddModalOpen(false);
        return;
      }

      await createSellerProduct({
        productId: parsedProductId,
        categoryId: product.categoryId,
        price: sellPrice,
        previousePrice: previousPrice ?? undefined,
        isHomePageView,
        hotDeal,
        topSelling,
      }).unwrap();

      message.success("Seller panel এ প্রোডাক্ট যোগ হয়েছে");
      setIsAddModalOpen(false);
    } catch (error) {
      message.error(getApiErrorMessage(error, "প্রোডাক্ট যোগ করা যায়নি"));
    }
  };

  return (
    <div className={`group flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
      isAuthenticated
        ? "border-gray-200 hover:border-blue-400 hover:-translate-y-1.5"
        : "border-gray-200 hover:border-violet-400 hover:-translate-y-1.5"
    }`}>
      <Link
        href={`/products/${product.id}`}
        className={`block relative overflow-hidden transition-colors duration-300 ${
          isAuthenticated ? "bg-blue-50 group-hover:bg-blue-100" : "bg-violet-50 group-hover:bg-violet-100"
        }`}
        style={{ aspectRatio: "4/3" }}
      >
        <span className={`absolute top-0 left-0 z-10 text-[9px] font-medium tracking-wider px-2.5 py-1 rounded-br-xl ${
          isAuthenticated ? "bg-blue-500 text-blue-50" : "bg-violet-500 text-violet-50"
        }`}>
          {isAuthenticated ? "Best Seller" : "নতুন"}
        </span>

        <button
          className={`absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white flex items-center justify-center border transition-all duration-200 ${
            isAuthenticated
              ? "border-gray-200 group-hover:border-blue-400 group-hover:text-blue-500 group-hover:scale-110"
              : "border-gray-200 group-hover:border-violet-400 group-hover:text-violet-500 group-hover:scale-110"
          }`}
          onClick={(e) => e.preventDefault()}
          aria-label="Wishlist"
        >
          <Heart className="w-3 h-3" />
        </button>

        <div className="relative w-full h-full">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        </div>

        {!isAuthenticated && (
          <div className="absolute inset-0 bg-violet-900/10 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-800 transition-transform duration-300 group-hover:scale-110">
              <Lock className="w-4 h-4" />
            </div>
          </div>
        )}
      </Link>

      <div className="flex flex-col p-3 gap-2">
        <div>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-[12.5px] font-medium text-gray-900 line-clamp-1 leading-snug hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {isAuthenticated ? "In stock" : "রেজিস্টার্ড রিসেলারদের জন্য"}
          </p>
        </div>

        <div className="border-t border-gray-100" />

        {isAuthenticated && (
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-blue-200 border border-blue-100">
                <div className="flex items-center gap-1 text-[10px] text-gray-900 font-semibold">
                  <Store className="w-3 h-3 text-blue-600" />
                  পাইকারি
                </div>
                <span className="text-[12px] font-medium text-blue-800">৳{wholesale}</span>
              </div>

              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-violet-300 border border-violet-100">
                <div className="flex items-center gap-1 text-[10px] text-gray-900 font-semibold">
                  <Tag className="w-3 h-3 text-violet-500" />
                  বিক্রয় মূল্য
                </div>
                <span className="text-[12px] font-medium text-violet-800">৳{sale}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              <Link href={`/products/${product.id}`} className="block">
                <button className="w-full py-1.5 rounded-xl text-[11px] font-medium border border-gray-200 text-gray-500 bg-white flex items-center justify-center gap-1 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 active:scale-95">
                  <Eye className="w-3 h-3" />
                  বিস্তারিত
                </button>
              </Link>
              <button
                onClick={handleAddProductClick}
                className="relative overflow-hidden w-full py-1.5 rounded-xl text-[11px] font-medium bg-blue-500 text-white border-none flex items-center justify-center gap-1 transition-all duration-200 active:scale-95 before:absolute before:inset-0 before:bg-blue-700 before:translate-x-[-100%] before:transition-transform before:duration-[250ms] hover:before:translate-x-0"
              >
                {isAlreadyAdded ? (
                  <Pencil className="w-3 h-3 relative z-10" />
                ) : (
                  <Plus className="w-3 h-3 relative z-10" />
                )}
                <span className="relative z-10">{isAlreadyAdded ? "Update" : "যোগ করুন"}</span>
              </button>
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-1.5 py-1">
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
              <button className="relative overflow-hidden w-full py-2 rounded-xl text-[11.5px] font-medium bg-violet-500 text-white border-none flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 before:absolute before:inset-0 before:bg-violet-700 before:translate-x-[-100%] before:transition-transform before:duration-[250ms] group-hover:before:translate-x-0">
                <UserPlus className="w-3.5 h-3.5 text-white relative z-10" />
                <span className="text-white relative z-10">রেজিস্ট্রেশন করুন</span>
              </button>
            </Link>
          </div>
        )}
      </div>

      <Modal
        title={isAlreadyAdded ? "Seller Product Update" : "Seller Product Add"}
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsAddModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="add"
            type="primary"
            loading={isSubmitting}
            onClick={handleConfirmAddProduct}
          >
            {isAlreadyAdded ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Product</p>
            <p className="text-sm text-slate-800">{product.title}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Sell Price</p>
            <InputNumber
              min={1}
              className="w-full"
              value={sellPrice}
              onChange={(value) => setSellPrice(value)}
              placeholder="Enter sell price"
            />
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-500">
              Previous Price
            </p>
            <InputNumber
              min={1}
              className="w-full"
              value={previousPrice}
              onChange={(value) => setPreviousPrice(value)}
              placeholder="Enter previous price"
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <label className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-xs">
              <span>Home View</span>
              <Switch
                checked={isHomePageView}
                onChange={(value) => setIsHomePageView(value)}
              />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-xs">
              <span>Hot Deal</span>
              <Switch checked={hotDeal} onChange={(value) => setHotDeal(value)} />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-xs">
              <span>Top Selling</span>
              <Switch
                checked={topSelling}
                onChange={(value) => setTopSelling(value)}
              />
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
