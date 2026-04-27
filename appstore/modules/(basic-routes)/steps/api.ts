import { baseApi } from "@/appstore/api/baseApi";

const stepsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all steps
    getSteps: build.query({
      query: () => "/steps",
    }),

    // create a step
    createSteps: build.mutation({
      query: (data) => ({
        url: "/steps/create",
        method: "POST",
        body: data,
      }),
    }),

    // update a step
    updateSteps: build.mutation({
      query: (data) => ({
        url: `/steps/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // delete a step
    deleteSteps: build.mutation({
      query: (id) => ({
        url: `/steps/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetStepsQuery,
  useCreateStepsMutation,
  useUpdateStepsMutation,
  useDeleteStepsMutation,
} = stepsApi;
