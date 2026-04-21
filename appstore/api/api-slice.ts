import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: async (headers) => {
    // Get session from NextAuth (works even after page reload)

    // if (session?.accessToken) {
    //   headers.set("Authorization", `Bearer ${session.accessToken}`);
    // }

    // if (session?.refreshToken) {
    //   headers.set("refreshToken", session.refreshToken);
    // }

    return headers;
  },
});

// Intercept unauthorized responses and trigger logout
const baseQueryWithLogout: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  
  const status = result?.error?.status;
  if (status === 401) {
    // Ensures the user is signed out when the session is invalid or forbidden
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithLogout,
  // keepUnusedDataFor: 0,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
