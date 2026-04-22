import { baseApi } from "@/appstore/api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProducts: build.query<unknown, string | void>({
      query: () => `/assets/products.json`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
