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
import { toast } from "react-toastify";

type Props = {
  params: {
    id: string;
  };
};

export default function EditProductPage({ params }: Props) {
  const router = useRouter();
  const productId = Number(params.id);
  const { data: brandsResponse } = useGetAllBrandsQuery();
  const { data: categoriesResponse } = useGetAllCategoriesQuery();
  const { data: attributesResponse } = useGetAllAttributesQuery();
  const { data: productResponse, isLoading: productLoading } =
    useGetSingleProductQuery(productId, { skip: Number.isNaN(productId) });
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const onSubmit = async (payload: ProductFormSubmitPayload) => {
    try {
      const result = await updateProduct({
        id: productId,
        ...payload,
        coverImage: payload.coverImage,
        images: payload.images,
      }).unwrap();
      toast.success(result?.message || "Product updated successfully.");
      router.push("/admin/products/all");
    } catch (error) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Update failed.";
      toast.error(message);
    }
  };

  if (Number.isNaN(productId)) {
    return <div className="p-6 text-red-600">Invalid product id.</div>;
  }

  if (productLoading) {
    return <div className="p-6">Loading product...</div>;
  }

  if (!productResponse?.data) {
    return <div className="p-6 text-red-600">Product not found.</div>;
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
