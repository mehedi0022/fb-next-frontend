import { baseApi } from "@/appstore/api/baseApi";

const batchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBatches: builder.query({
      query: () => "/batch",
    }),

    createBatch: builder.mutation({
      query: (data) => ({
        url: "/batch/create",
        method: "POST",
        body: data,
      }),
    }),

    updateBatch: builder.mutation({
      query: (data) => ({
        url: `/batch/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteBatch: builder.mutation({
      query: (id) => ({
        url: `/batch/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBatchesQuery,
  useCreateBatchMutation,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
} = batchApi;
