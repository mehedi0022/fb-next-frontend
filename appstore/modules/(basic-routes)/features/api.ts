import { baseApi } from "@/appstore/api/baseApi";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  sort_order: number;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

interface Features {
  success: boolean;
  data: FeatureItem[];
}

const featuresApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all features
    getFeatures: build.query<Features, void>({
      query: () => "/features",
    }),

    // create feature
    createFeature: build.mutation({
      query: (data) => ({
        url: "/features/create",
        method: "POST",
        body: data,
      }),
    }),

    // update feature
    updateFeature: build.mutation({
      query: (data) => ({
        url: `/features/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // delete feature
    deleteFeature: build.mutation({
      query: (id) => ({
        url: `/features/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFeaturesQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featuresApi;
