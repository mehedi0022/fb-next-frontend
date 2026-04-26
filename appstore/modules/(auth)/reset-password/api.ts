import { baseApi } from "@/appstore/api/baseApi";

const resetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: { newPassword: password},
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = resetApi;
