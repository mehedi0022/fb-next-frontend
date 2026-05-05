import { baseApi } from "@/appstore/api/baseApi";
import { Batch } from "@/lib/home";

export type BatchResponse = {
  success: boolean;
  message: string;
  data: Batch[];
};

const batchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBatches: builder.query<BatchResponse, void>({
      query: () => "/batch",
    }),

    createBatch: builder.mutation({
      query: (data) => ({
        url: "/batch/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Branch"],
    }),

    updateBatch: builder.mutation({
      query: (data) => ({
        url: `/batch/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Branch"],
    }),

    deleteBatch: builder.mutation({
      query: (id) => ({
        url: `/batch/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
});

export const {
  useGetBatchesQuery,
  useCreateBatchMutation,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
} = batchApi;
