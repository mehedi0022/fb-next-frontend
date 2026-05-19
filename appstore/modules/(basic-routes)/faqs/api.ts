import { baseApi } from "@/appstore/api/baseApi";
import { FaqsResponse } from "@/lib/home";

const faqsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all faqs
    getFaqs: build.query<FaqsResponse, void>({
      query: () => "/faqs",
      providesTags: ["Faq"],
    }),

    // create a faq
    createFaq: build.mutation({
      query: (data) => ({
        url: "/faqs/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),

    // update a faq
    updateFaq: build.mutation({
      query: (data) => ({
        url: `/faqs/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),

    // delete a faq
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `/faqs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqsApi;
