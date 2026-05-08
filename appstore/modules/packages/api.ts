import { baseApi } from "@/appstore/api/baseApi";
import { PackagesResponse } from "@/lib/admin/types";

const packagesApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getAllPackages: builder.query<PackagesResponse, void>({
            query: () => "/seller-pakage",
            providesTags: ["Packages"]
        }),

        updatePackage: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/seller-pakage/update/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["Packages"]
        }),

        createPackage: builder.mutation({
            query: (body) => ({
                url: "/seller-pakage/create",
                method: "POST",
                body
            }),
            invalidatesTags: ["Packages"]
        }),

        deletePackage: builder.mutation({
            query: (id) => ({
            url: `/seller-pakage/delete/${id}`,
            method: "DELETE",
            }),
            invalidatesTags: ["Packages"]
        })
    }),
})

export const { useGetAllPackagesQuery, useUpdatePackageMutation, useCreatePackageMutation, useDeletePackageMutation } = packagesApi;

