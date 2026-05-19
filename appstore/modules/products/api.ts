import { baseApi } from "@/appstore/api/baseApi";

type ApiSuccessResponse = {
  success: boolean;
  message?: string;
};

export type ProductListItem = {
  id: number;
  name: string;
  slug: string;
  coverImage?: string | null;
  thumbnail?: string | null;
  shortDescription?: string | null;
  isActive: boolean;
  totalStock?: number;
  variantCount?: number;
  wholesalePrice?: number;
  suggestedPrice?:
    | { type: "fixed"; value: number }
    | { type: "range"; min: number; max: number };
  createdAt?: string;
  category?: {
    id: number;
    name: string;
    slug?: string;
  };
  brand?: {
    id: number;
    name: string;
    slug?: string;
  } | null;
};

export type ProductVariantPayload = {
  sku?: string;
  costPrice: number;
  wholesalePrice: number;
  suggestedPrice: number;
  stock: number;
  attributes: number[];
};

export type CreateProductPayload = {
  name: string;
  categoryId: number;
  brandId?: number | null;
  shortDescription?: string;
  description?: string;
  videoUrl?: string;
  variants?: ProductVariantPayload[];
  costPrice?: number;
  wholesalePrice?: number;
  suggestedPrice?: number;
  stock?: number;
  coverImage: File;
  images?: File[];
};

export type UpdateProductPayload = {
  id: number;
  name: string;
  categoryId: number;
  brandId?: number | null;
  shortDescription?: string;
  description?: string;
  videoUrl?: string;
  isActive?: boolean;
  slug?: string;
  variants?: ProductVariantPayload[];
  costPrice?: number;
  wholesalePrice?: number;
  suggestedPrice?: number;
  stock?: number;
  coverImage?: File;
  images?: File[];
};

export type ProductDetails = {
  id: number;
  name: string;
  slug: string;
  coverImage?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  videoUrl?: string | null;
  isActive: boolean;
  category: {
    id: number;
    name: string;
    slug?: string;
    breadcrumb?: string;
  };
  brand?: {
    id: number;
    name: string;
    slug?: string;
  } | null;
  images: { id: number; url: string }[];
  variants: {
    id: number;
    sku: string;
    costPrice: number;
    wholesalePrice: number;
    suggestedPrice: number;
    stock: number;
    attributes: {
      attributeId: number;
      attributeName: string;
      valueId: number;
      valueName: string;
    }[];
  }[];
};

type ProductListResponse = {
  success: boolean;
  data: ProductListItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

type ProductSingleResponse = {
  success: boolean;
  data: ProductDetails;
};

export type ProductBrand = {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductCategory = {
  id: number;
  name: string;
  slug?: string;
  image?: string | null;
  parentId?: number | null;
  children?: ProductCategory[];
  createdAt?: string;
  updatedAt?: string;
};

export type ProductAttribute = {
  id: number;
  name: string;
  values: {
    id: number;
    value: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
};

type ProductBrandResponse = {
  success: boolean;
  data: ProductBrand[];
};

type ProductCategoryResponse = {
  success: boolean;
  data: ProductCategory[];
};

type ProductAttributeResponse = {
  success: boolean;
  data: ProductAttribute[];
};

export type CreateBrandPayload = {
  name: string;
};

export type CreateCategoryPayload = {
  name: string;
  parentId?: number | null;
  image?: File | null;
};

export type CreateAttributePayload = {
  name: string;
  values: string[];
};

export type UpdateBrandPayload = {
  id: number;
  name: string;
};

export type UpdateCategoryPayload = {
  id: number;
  name: string;
  parentId?: number | null;
  image?: File | null;
};

export type UpdateAttributePayload = {
  id: number;
  name: string;
};

export type UpdateAttributeValuePayload = {
  valueId: number;
  value: string;
};

export type AddAttributeValuesPayload = {
  id: number;
  values: string[];
};

export type ProductListParams = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  brandId?: number;
  isActive?: boolean;
  metric?: "low-stock" | "out-of-stock" | "new-arrivals" | "draft";
  threshold?: number;
  days?: number;
};

const getSimpleProductVariant = (variants?: ProductVariantPayload[]) => {
  if (!variants || variants.length !== 1) return null;

  const [variant] = variants;
  if (variant.attributes?.length) return null;

  return variant;
};

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductListResponse, ProductListParams | void>({
      query: (params) => ({
        url: "/product",
        params: params ?? undefined,
      }),
      providesTags: ["Product"],
    }),

    getSingleProduct: builder.query<ProductSingleResponse, string | number>({
      query: (slugOrId) => {
        const value = String(slugOrId).trim();
        const isNumericId = /^\d+$/.test(value);
        return isNumericId ? `/product/${value}` : `/product/slug/${value}`;
      },
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation<ApiSuccessResponse, CreateProductPayload>({
      query: (payload) => {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("categoryId", String(payload.categoryId));
        if (payload.brandId) formData.append("brandId", String(payload.brandId));
        if (payload.shortDescription)
          formData.append("shortDescription", payload.shortDescription);
        if (payload.description) formData.append("description", payload.description);
        if (payload.videoUrl) formData.append("videoUrl", payload.videoUrl);
        const simpleVariant = getSimpleProductVariant(payload.variants);
        if (simpleVariant) {
          formData.append("costPrice", String(simpleVariant.costPrice));
          formData.append("wholesalePrice", String(simpleVariant.wholesalePrice));
          formData.append("suggestedPrice", String(simpleVariant.suggestedPrice));
          formData.append("stock", String(simpleVariant.stock));
        } else if (payload.variants?.length) {
          formData.append("variants", JSON.stringify(payload.variants));
        } else {
          formData.append("costPrice", String(payload.costPrice ?? 0));
          formData.append("wholesalePrice", String(payload.wholesalePrice ?? 0));
          formData.append("suggestedPrice", String(payload.suggestedPrice ?? 0));
          formData.append("stock", String(payload.stock ?? 0));
        }
        formData.append("coverImage", payload.coverImage);
        (payload.images || []).forEach((file) => {
          formData.append("images", file);
        });
        return {
          url: "/product/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<ApiSuccessResponse, UpdateProductPayload>({
      query: ({ id, ...payload }) => {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("categoryId", String(payload.categoryId));
        if (payload.slug) formData.append("slug", payload.slug);
        if (payload.brandId) formData.append("brandId", String(payload.brandId));
        if (payload.shortDescription !== undefined) {
          formData.append("shortDescription", payload.shortDescription ?? "");
        }
        if (payload.description !== undefined) {
          formData.append("description", payload.description ?? "");
        }
        if (payload.videoUrl !== undefined) {
          formData.append("videoUrl", payload.videoUrl ?? "");
        }
        if (payload.isActive !== undefined) {
          formData.append("isActive", String(payload.isActive));
        }
        const simpleVariant = getSimpleProductVariant(payload.variants);
        if (simpleVariant) {
          formData.append("costPrice", String(simpleVariant.costPrice));
          formData.append("wholesalePrice", String(simpleVariant.wholesalePrice));
          formData.append("suggestedPrice", String(simpleVariant.suggestedPrice));
          formData.append("stock", String(simpleVariant.stock));
        } else if (payload.variants?.length) {
          formData.append("variants", JSON.stringify(payload.variants));
        } else {
          formData.append("costPrice", String(payload.costPrice ?? 0));
          formData.append("wholesalePrice", String(payload.wholesalePrice ?? 0));
          formData.append("suggestedPrice", String(payload.suggestedPrice ?? 0));
          formData.append("stock", String(payload.stock ?? 0));
        }
        if (payload.coverImage) formData.append("coverImage", payload.coverImage);
        (payload.images || []).forEach((file) => {
          formData.append("images", file);
        });
        return {
          url: `/product/update/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<ApiSuccessResponse, number>({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    hardDeleteProduct: builder.mutation<ApiSuccessResponse, number>({
      query: (id) => ({
        url: `/product/delete/${id}/hard`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getAllBrands: builder.query<ProductBrandResponse, void>({
      query: () => "/product/brand",
      providesTags: ["Product"],
    }),

    createBrand: builder.mutation<ApiSuccessResponse, CreateBrandPayload>({
      query: (body) => ({
        url: "/product/brand/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateBrand: builder.mutation<ApiSuccessResponse, UpdateBrandPayload>({
      query: ({ id, ...body }) => ({
        url: `/product/brand/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteBrand: builder.mutation<ApiSuccessResponse, number>({
      query: (id) => ({
        url: `/product/brand/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getAllCategories: builder.query<ProductCategoryResponse, void>({
      query: () => "/product/category",
      providesTags: ["Product"],
    }),

    createCategory: builder.mutation<ApiSuccessResponse, CreateCategoryPayload>({
      query: (body) => {
        const formData = new FormData();
        formData.append("name", body.name);
        if (body.parentId !== undefined && body.parentId !== null) {
          formData.append("parentId", String(body.parentId));
        }
        if (body.image) {
          formData.append("image", body.image);
        }
        return {
          url: "/product/category/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    updateCategory: builder.mutation<ApiSuccessResponse, UpdateCategoryPayload>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        formData.append("name", body.name);
        if (body.parentId === null) {
          formData.append("parentId", "");
        } else if (body.parentId !== undefined) {
          formData.append("parentId", String(body.parentId));
        }
        if (body.image) {
          formData.append("image", body.image);
        }
        return {
          url: `/product/category/update/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    deleteCategory: builder.mutation<ApiSuccessResponse, number>({
      query: (id) => ({
        url: `/product/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getAllAttributes: builder.query<ProductAttributeResponse, void>({
      query: () => "/product/attribute",
      providesTags: ["Product"],
    }),

    createAttribute: builder.mutation<
      ApiSuccessResponse,
      CreateAttributePayload
    >({
      query: (body) => ({
        url: "/product/attribute/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateAttribute: builder.mutation<
      ApiSuccessResponse,
      UpdateAttributePayload
    >({
      query: ({ id, ...body }) => ({
        url: `/product/attribute/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateAttributeValue: builder.mutation<
      ApiSuccessResponse,
      UpdateAttributeValuePayload
    >({
      query: ({ valueId, value }) => ({
        url: `/product/attribute/update/values/${valueId}`,
        method: "PUT",
        body: { value },
      }),
      invalidatesTags: ["Product"],
    }),

    addAttributeValues: builder.mutation<
      ApiSuccessResponse,
      AddAttributeValuesPayload
    >({
      query: ({ id, values }) => ({
        url: `/product/attribute/${id}/values`,
        method: "POST",
        body: { values },
      }),
      invalidatesTags: ["Product"],
    }),

    deleteAttributeValue: builder.mutation<ApiSuccessResponse, number>({
      query: (valueId) => ({
        url: `/product/attribute/delete/values/${valueId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    deleteAttribute: builder.mutation<ApiSuccessResponse, number>({
      query: (id) => ({
        url: `/product/attribute/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useHardDeleteProductMutation,
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllAttributesQuery,
  useCreateAttributeMutation,
  useUpdateAttributeMutation,
  useUpdateAttributeValueMutation,
  useAddAttributeValuesMutation,
  useDeleteAttributeValueMutation,
  useDeleteAttributeMutation,
} = productApi;
