import { baseApi } from "@/appstore/api/baseApi";
import { Branch } from "@/lib/home";

interface BranchResponse {
  success: boolean;
  branches: Branch[];
}

const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranches: builder.query<BranchResponse, void>({
      query: () => "/branch",
      providesTags: ["Branch"],
    }),

    createBranch: builder.mutation({
      query: (data) => ({
        url: "/branch/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Branch"],
    }),

    updateBranch: builder.mutation({
      query: (data) => ({
        url: `/branch/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Branch"],
    }),

    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/branch/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchApi;
