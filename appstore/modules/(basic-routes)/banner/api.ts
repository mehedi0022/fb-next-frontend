import { baseApi } from "@/appstore/api/baseApi";
import type { BannersResponse } from "@/lib/home/types";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get banner data
    getBanners: build.query<BannersResponse, void>({
      query: () => "/banner",
      providesTags: ["Banner"],
    }),

    // create a banner
    createBanner: build.mutation({
      query: (data) => ({
        url: "/banner/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banner"],
    }),

    // update a banner
    updateBanner: build.mutation({
      query: ({ id, body }) => ({
        url: `/banner/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Banner"],
    }),

    // delete a banner
    deleteBanner: build.mutation({
      query: (id) => ({
        url: `/banner/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
