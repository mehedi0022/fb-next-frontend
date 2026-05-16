import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login
    login: builder.mutation<
      { message: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    // verify OTP
    verifyOtp: builder.mutation<
      { message: string; user?: { role?: string } },
      { email?: string; phone?: string; otp: string; rememberMe: boolean }
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // resend OTP
    resendOtp: builder.mutation<{ message: string }, { email?: string }>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

    // get current user
    checkMe: builder.query<{ user: unknown }, void>({
      query: () => ({
        url: "/auth/check-me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation<
      { message: string },
      { email: string; currentPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/auth/update-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useCheckMeQuery,
  useLogoutMutation,
  useUpdatePasswordMutation,
} = authApi;
