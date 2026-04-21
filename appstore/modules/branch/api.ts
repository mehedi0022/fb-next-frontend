import { apiSlice } from "@/appstore/api/api-slice";

const branchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranches: builder.query({
      query: () => "/branch",
    }),

    createBranch: builder.mutation({
      query: (data) => ({
        url: "/branch/create",
        method: "POST",
        body: data,
      }),
    }),

    updateBranch: builder.mutation({
      query: (data) => ({
        url: `/branch/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/branch/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchApi;
