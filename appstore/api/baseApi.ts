import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logoutSession } from "../slices/sessionSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

let refreshPromise: Promise<unknown> | null = null;

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!refreshPromise) {
      refreshPromise = Promise.resolve(
        rawBaseQuery(
          { url: "/auth/regenerate-access-token", method: "POST" },
          api,
          extraOptions,
        ),
      ).finally(() => {
        refreshPromise = null;
      });
    }

    const refreshResult = (await refreshPromise) as Awaited<
      ReturnType<typeof rawBaseQuery>
    >;

    if (refreshResult.data) {
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutSession());
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
    "Feature",
    "Step",
    "Faq",
    "Banner",
  ],
  endpoints: () => ({}),
});
