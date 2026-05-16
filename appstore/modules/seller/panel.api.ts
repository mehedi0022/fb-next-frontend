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
    level: number;
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
    images?: unknown[];
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

type SingleResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type SellerPanelListParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive";
};

export type CreateSellerCategoryPayload = {
  categoryId: number;
  status?: SellerCategoryStatus;
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
  price: number;
  previousePrice?: number;
  status?: SellerProductStatus;
  isHomePageView?: boolean;
  hotDeal?: boolean;
  topSelling?: boolean;
};

export type UpdateSellerProductPayload = {
  id: number;
  status?: SellerProductStatus;
  price?: number;
  previousePrice?: number;
  isHomePageView?: boolean;
  hotDeal?: boolean;
  topSelling?: boolean;
};

const sellerPanelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellerCategories: builder.query<
      PaginatedResponse<SellerCategoryItem>,
      SellerPanelListParams | void
    >({
      query: (params) => ({
        url: "/seller/category",
        params: params ?? undefined,
      }),
      providesTags: ["SellerPanel"],
    }),

    createSellerCategory: builder.mutation<
      SingleResponse<SellerCategoryItem>,
      CreateSellerCategoryPayload
    >({
      query: (body) => ({
        url: "/seller/category/create",
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
        url: `/seller/category/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SellerPanel"],
    }),

    deleteSellerCategory: builder.mutation<
      { success: boolean; message?: string },
      number
    >({
      query: (id) => ({
        url: `/seller/category/delete/${id}`,
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
        url: "/seller/products/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SellerPanel"],
    }),

    updateSellerProduct: builder.mutation<
      SingleResponse<SellerProductItem>,
      UpdateSellerProductPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/seller/products/update/${id}`,
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
        url: `/seller/products/delete/${id}`,
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
  useUpdateSellerProductMutation,
  useDeleteSellerProductMutation,
} = sellerPanelApi;

