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
      providesTags: ["Batch"],
    }),

    createBatch: builder.mutation({
      query: (data) => ({
        url: "/batch/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Batch"],
    }),

    updateBatch: builder.mutation({
      query: (data) => ({
        url: `/batch/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Batch"],
    }),

    deleteBatch: builder.mutation({
      query: (id) => ({
        url: `/batch/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Batch"],
    }),
  }),
});

export const {
  useGetBatchesQuery,
  useCreateBatchMutation,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
} = batchApi;
