import { baseApi } from "@/appstore/api/baseApi";
import {
  DashboardMetricsResponse,
  ProductMetricsResponse,
} from "@/lib/admin/types";

export interface DashboardMetricsParams {
  branchId?: number;
  batchId?: number;
  dateFrom?: string;
  dateTo?: string;
}

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<
      DashboardMetricsResponse,
      DashboardMetricsParams | void
    >({
      query: (params) => ({
        url: "/dashboard-matric",
        params: params ?? undefined,
      }),
      providesTags: ["Dashboard"],
    }),
    getProductMetrics: builder.query<
      ProductMetricsResponse,
      { lowStockThreshold?: number; topLimit?: number } | void
    >({
      query: (params) => ({
        url: "/dashboard-matric/product-metrics",
        params: params ?? undefined,
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardMetricsQuery, useGetProductMetricsQuery } =
  dashboardApi;
