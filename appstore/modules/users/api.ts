import { apiSlice } from "@/appstore/api/api-slice";

export const usersApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getUsers: build.query<any, string | void>({
      query: (queryStr) => `/posts`,
      providesTags: ["User"],
    }),

    getPost: build.query<any, string>({
      query: (id) => `/posts/${id}`,
      providesTags: ["User"],
    }),

    assignPosUserAccess: build.mutation<any, any>({
      query: (data) => ({
        method: "PATCH",
        url: "/user",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useGetPostQuery } = usersApi;
