import { baseApi } from "@/appstore/api/baseApi";
import type { StepsResponse } from "@/lib/home";

const stepsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all steps
    getSteps: build.query<StepsResponse, void>({
      query: () => "/steps",
      providesTags: ["Step"],
    }),

    // create a step
    createSteps: build.mutation({
      query: (data) => ({
        url: "/steps/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Step"],
    }),

    // update a step
    updateSteps: build.mutation({
      query: (data) => ({
        url: `/steps/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Step"],
    }),

    // delete a step
    deleteSteps: build.mutation({
      query: (id) => ({
        url: `/steps/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Step"],
    }),
  }),
});

export const {
  useGetStepsQuery,
  useCreateStepsMutation,
  useUpdateStepsMutation,
  useDeleteStepsMutation,
} = stepsApi;
