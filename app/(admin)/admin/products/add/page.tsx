"use client";

import {
  useCreateProductMutation,
  useGetAllAttributesQuery,
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
} from "@/appstore/modules/products/api";
import ProductForm, {
  ProductFormSubmitPayload,
} from "@/components/admin/products/product/ProductForm";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

export default function AddProductPage() {
  const router = useRouter();
  const { data: brandsResponse } = useGetAllBrandsQuery();
  const { data: categoriesResponse } = useGetAllCategoriesQuery();
  const { data: attributesResponse } = useGetAllAttributesQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit = async (payload: ProductFormSubmitPayload) => {
    if (!payload.coverImage) {
      message.error("Product cover image is required.");
      return;
    }

    try {
      const result = await createProduct({
        ...payload,
        coverImage: payload.coverImage,
      }).unwrap();
      message.success(result?.message || "Product created successfully.");
      router.push("/admin/products/all");
    } catch (error) {
      message.error(getApiErrorMessage(error, "Create failed."));
    }
  };

  return (
    <div className="space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create Product</h1>
        <Link href="/admin/products/all">
          <Button>Back to Products</Button>
        </Link>
      </div>

      <ProductForm
        mode="create"
        brands={brandsResponse?.data || []}
        categories={categoriesResponse?.data || []}
        attributes={attributesResponse?.data || []}
        submitting={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
}
