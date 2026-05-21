import { baseApi } from "@/appstore/api/baseApi";

type SellerOrderSummaryResponse = {
  success: boolean;
  data: {
    counts: {
      total: number;
      pending: number;
      confirmed: number;
      packed: number;
      shipped: number;
      delivered: number;
      returned: number;
      cancelled: number;
    };
    amounts: {
      totalGrand: string;
      totalProfit: string;
      totalWholesale: string;
      totalDeliveryCharge: string;
      totalPackagingCharge: string;
      totalCodCharge: string;
    };
  };
};

type SellerOrdersResponse = {
  success: boolean;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  data: Array<{
    id: number;
    orderNo: string;
    status: string;
    createdAt: string;
    trackingNo: string | null;
    grandTotal: string;
    wholesaleTotal: string;
    deliveryCharge: string;
    packagingCharge: string;
    grossProfit: string;
    items: Array<{ id: number }>;
  }>;
};

export type SellerOrdersQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  internalStatus?: string;
  dateFrom?: string;
  dateTo?: string;
};

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellerOrderSummary: builder.query<
      SellerOrderSummaryResponse,
      { dateFrom?: string; dateTo?: string } | void
    >({
      query: (params) => ({
        url: "/order/seller/summary",
        params: params ?? undefined,
      }),
      providesTags: ["Dashboard"],
    }),
    getSellerOrders: builder.query<
      SellerOrdersResponse,
      SellerOrdersQueryParams | void
    >({
      query: (params) => ({
        url: "/order/seller",
        params: params ?? undefined,
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetSellerOrderSummaryQuery, useGetSellerOrdersQuery } = orderApi;
