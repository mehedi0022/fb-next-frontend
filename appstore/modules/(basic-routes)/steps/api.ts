import { baseApi } from "@/appstore/api/baseApi";

interface StepItem {
  id: number;
  description: string;
  sort_order: number;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

interface Steps {
  success: boolean;
  data: StepItem[];
} 

const stepsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all steps
    getSteps: build.query<Steps, void>({
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
