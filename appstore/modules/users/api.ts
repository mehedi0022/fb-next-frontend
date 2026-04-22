import { baseApi } from "@/appstore/api/baseApi";

export const usersApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getUsers: build.query<unknown, string | void>({
      query: () => `/posts`,
      providesTags: ["User"],
    }),

    getPost: build.query<unknown, string>({
      query: (id) => `/posts/${id}`,
      providesTags: ["User"],
    }),

    assignPosUserAccess: build.mutation<unknown, unknown>({
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
