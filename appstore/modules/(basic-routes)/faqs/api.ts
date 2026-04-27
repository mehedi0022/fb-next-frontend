import { baseApi } from "@/appstore/api/baseApi";

interface FaqItem {
  id: string | number;
  question: string;
  answer: string;
  status: "active" | "inactive";
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface Faq {
  success: boolean;
  data: FaqItem[];
}

const faqsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all faqs
    getFaqs: build.query<Faq, void>({
      query: () => "/faqs",
    }),

    // create a faq
    createFaq: build.mutation({
      query: (data) => ({
        url: "/faqs/create",
        method: "POST",
        body: data,
      }),
    }),

    // update a faq
    updateFaq: build.mutation({
      query: (data) => ({
        url: `/faqs/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // delete a faq
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `/faqs/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqsApi;
