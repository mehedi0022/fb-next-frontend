import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearSession } from "../slices/sessionSlice"; // adjust path

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

let isRefreshing = false;

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Prevent multiple simultaneous refresh calls
    if (!isRefreshing) {
      isRefreshing = true;

      const refreshResult = await rawBaseQuery(
        { url: "/auth/regenerate-access-token", method: "POST" },
        api,
        extraOptions,
      );

      isRefreshing = false;

      if (refreshResult.data) {
        // Token refreshed — retry the original request
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        // Refresh also failed — clear session and force logout
        api.dispatch(clearSession());
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefresh,
  tagTypes: [
    "User",
    "Branch",
    "Seller",
    "Packages",
    "Dashboard",
    "Product",
    "SellerPanel",
  ],
  endpoints: () => ({}),
});
