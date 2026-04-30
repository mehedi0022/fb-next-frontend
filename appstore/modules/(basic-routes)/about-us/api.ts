import { baseApi } from "@/appstore/api/baseApi";

const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get about us
    getAboutUs: build.query({
      query: () => "/about",
    }),

    // create about us
    createAboutUs: build.mutation({
      query: (data) => ({
        url: "/about/create",
        method: "POST",
        body: data,
      }),
    }),

    // update about us
    updateAboutUs: build.mutation({
      query: (data) => ({
        url: `/about/update`,
        method: "PUT",
        body: data,
      }),
    }),

    // delete about us
    deleteAboutUs: build.mutation({
      query: (id) => ({
        url: `/about/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
  useDeleteAboutUsMutation,
} = aboutUsApi;
