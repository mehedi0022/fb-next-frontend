import { baseApi } from "@/appstore/api/baseApi";

type ApiSuccessResponse = {
  success: boolean;
  message?: string;
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
};

export type UpdateAttributePayload = {
  id: number;
  name: string;
};

export type AddAttributeValuesPayload = {
  id: number;
  values: string[];
};

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
      query: (body) => ({
        url: "/product/category/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateCategory: builder.mutation<ApiSuccessResponse, UpdateCategoryPayload>({
      query: ({ id, ...body }) => ({
        url: `/product/category/update/${id}`,
        method: "PUT",
        body,
      }),
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
  useAddAttributeValuesMutation,
  useDeleteAttributeValueMutation,
  useDeleteAttributeMutation,
} = productApi;
