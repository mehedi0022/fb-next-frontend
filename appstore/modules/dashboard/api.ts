import { baseApi } from "@/appstore/api/baseApi";
import { DashboardMetricsResponse } from "@/lib/admin/types";

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
  }),
});

export const { useGetDashboardMetricsQuery } = dashboardApi;
