"use client";

import {
  useGetAllAttributesQuery,
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/appstore/modules/products/api";
import ProductForm, {
  ProductFormSubmitPayload,
} from "@/components/admin/products/product/ProductForm";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

type Props = {
  params: {
    id: string;
  };
};

export default function EditProductPage({ params }: Props) {
  const router = useRouter();
  const productKey = params.id;
  const { data: brandsResponse } = useGetAllBrandsQuery();
  const { data: categoriesResponse } = useGetAllCategoriesQuery();
  const { data: attributesResponse } = useGetAllAttributesQuery();
  const {
    data: productResponse,
    isLoading: productLoading,
    isFetching: productFetching,
    error: productError,
  } = useGetSingleProductQuery(productKey, { skip: !productKey });
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const onSubmit = async (payload: ProductFormSubmitPayload) => {
    if (!productResponse?.data?.id) {
      message.error("Product data is not ready yet.");
      return;
    }

    try {
      const result = await updateProduct({
        id: productResponse.data.id,
        ...payload,
        coverImage: payload.coverImage,
        images: payload.images,
      }).unwrap();
      message.success(result?.message || "Product updated successfully.");
      router.push("/admin/products/all");
    } catch (error) {
      message.error(getApiErrorMessage(error, "Update failed."));
    }
  };

  if (!productKey) {
    return <div className="p-6 text-red-600">Invalid product id.</div>;
  }

  if (productLoading || productFetching) {
    return <div className="p-6">Loading product...</div>;
  }

  if (!productResponse?.data) {
    const message = getApiErrorMessage(productError, "Product not found.");

    return <div className="p-6 text-red-600">{message}</div>;
  }

  return (
    <div className="space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Product</h1>
        <Link href="/admin/products/all">
          <Button>Back to Products</Button>
        </Link>
      </div>

      <ProductForm
        mode="edit"
        brands={brandsResponse?.data || []}
        categories={categoriesResponse?.data || []}
        attributes={attributesResponse?.data || []}
        initialData={productResponse.data}
        submitting={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
}
