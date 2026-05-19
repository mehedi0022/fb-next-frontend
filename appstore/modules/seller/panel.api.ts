import { baseApi } from "@/appstore/api/baseApi";

export type SellerCategoryStatus = "active" | "inactive";
export type SellerProductStatus = "active" | "inactive";

export type SellerCategoryItem = {
  id: number;
  categoryId: number;
  categorySlug?: string | null;
  isHomePageView: boolean;
  isMenuView: boolean;
  isFeatured: boolean;
  status: SellerCategoryStatus;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
    level?: number;
    parent?: {
      id: number;
      name: string;
      slug: string;
    } | null;
  };
};

export type SellerProductItem = {
  id: number;
  productId: number;
  productSlug?: string | null;
  categoryId: number;
  categorySlug?: string | null;
  previousePrice?: number | null;
  price?: number | null;
  descsription?: string | null;
  isHomePageView: boolean;
  hotDeal: boolean;
  topSelling: boolean;
  status: SellerProductStatus;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    name: string;
    slug: string;
    coverImage?: string | null;
    variants?: Array<{
      id: number;
      stock: number;
      price: number;
    }>;
  };
  category: {
    id: number;
    name: string;
    slug: string;
    parent?: {
      id: number;
      name: string;
      slug: string;
    } | null;
  };
};

type PaginatedResponse<T> = {
  success: boolean;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  data: T[];
};

type ListResponse<T> = {
  success: boolean;
  data: T[];
};

type SingleResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    affectedProducts?: number;
  };
};

export type SellerPanelListParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive";
  categoryId?: number;
  hotDeal?: boolean;
  topSelling?: boolean;
  isHomePageView?: boolean;
  isMenuView?: boolean;
  isFeatured?: boolean;
};

export type CreateSellerCategoryPayload = {
  categoryId: number;
  isHomePageView?: boolean;
  isMenuView?: boolean;
  isFeatured?: boolean;
};

export type UpdateSellerCategoryPayload = {
  id: number;
  status?: SellerCategoryStatus;
  isHomePageView?: boolean;
  isMenuView?: boolean;
  isFeatured?: boolean;
};

export type CreateSellerProductPayload = {
  productId: number;
  categoryId?: number;
  price: number;
  previousePrice?: number;
  description?: string;
  isHomePageView?: boolean;
  hotDeal?: boolean;
  topSelling?: boolean;
};

export type UpdateSellerProductPayload = {
  id: number;
  status?: SellerProductStatus;
  price?: number;
  previousePrice?: number;
  description?: string;
  isHomePageView?: boolean;
  hotDeal?: boolean;
  topSelling?: boolean;
};

const sellerPanelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellerCategories: builder.query<
      ListResponse<SellerCategoryItem>,
      SellerPanelListParams | void
    >({
      query: (params) => ({
        url: "/seller/categories",
        params: params ?? undefined,
      }),
      providesTags: ["SellerPanel"],
    }),

    createSellerCategory: builder.mutation<
      SingleResponse<SellerCategoryItem>,
      CreateSellerCategoryPayload
    >({
      query: (body) => ({
        url: "/seller/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SellerPanel"],
    }),

    updateSellerCategory: builder.mutation<
      SingleResponse<SellerCategoryItem>,
      UpdateSellerCategoryPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/seller/categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SellerPanel"],
    }),

    deleteSellerCategory: builder.mutation<
      { success: boolean; message?: string; meta?: { affectedProducts?: number } },
      number
    >({
      query: (id) => ({
        url: `/seller/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SellerPanel"],
    }),

    getSellerProducts: builder.query<
      PaginatedResponse<SellerProductItem>,
      SellerPanelListParams | void
    >({
      query: (params) => ({
        url: "/seller/products",
        params: params ?? undefined,
      }),
      providesTags: ["SellerPanel"],
    }),

    createSellerProduct: builder.mutation<
      SingleResponse<SellerProductItem>,
      CreateSellerProductPayload
    >({
      query: (body) => ({
        url: "/seller/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SellerPanel"],
    }),

    getSellerProductById: builder.query<SingleResponse<SellerProductItem>, number>({
      query: (id) => ({
        url: `/seller/products/${id}`,
      }),
      providesTags: ["SellerPanel"],
    }),

    updateSellerProduct: builder.mutation<
      SingleResponse<SellerProductItem>,
      UpdateSellerProductPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/seller/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SellerPanel"],
    }),

    deleteSellerProduct: builder.mutation<
      { success: boolean; message?: string },
      number
    >({
      query: (id) => ({
        url: `/seller/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SellerPanel"],
    }),
  }),
});

export const {
  useGetSellerCategoriesQuery,
  useCreateSellerCategoryMutation,
  useUpdateSellerCategoryMutation,
  useDeleteSellerCategoryMutation,
  useGetSellerProductsQuery,
  useCreateSellerProductMutation,
  useGetSellerProductByIdQuery,
  useUpdateSellerProductMutation,
  useDeleteSellerProductMutation,
} = sellerPanelApi;
