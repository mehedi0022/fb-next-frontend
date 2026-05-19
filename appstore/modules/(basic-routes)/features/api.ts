import { baseApi } from "@/appstore/api/baseApi";
import type { FeaturesResponse } from "@/lib/home";

const featuresApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all features
    getFeatures: build.query<FeaturesResponse, void>({
      query: () => "/features",
      providesTags: ["Feature"],
    }),

    // create feature
    createFeature: build.mutation({
      query: (data) => ({
        url: "/features/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feature"],
    }),

    // update feature
    updateFeature: build.mutation({
      query: (data) => ({
        url: `/features/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Feature"],
    }),

    // delete feature
    deleteFeature: build.mutation({
      query: (id) => ({
        url: `/features/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feature"],
    }),
  }),
});

export const {
  useGetFeaturesQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featuresApi;
