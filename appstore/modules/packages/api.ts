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
        }),

        setSellerPackage: builder.mutation<
            { success: boolean; message?: string },
            { sellerId: number; sellerPackageId: number }
        >({
            query: ({ sellerId, sellerPackageId }) => ({
                url: `/seller/set-seller-package/${sellerId}`,
                method: "POST",
                body: { sellerPackageId },
            }),
            invalidatesTags: ["Seller"],
        }),
    }),
})

export const {
    useGetAllPackagesQuery,
    useUpdatePackageMutation,
    useCreatePackageMutation,
    useDeletePackageMutation,
    useSetSellerPackageMutation,
} = packagesApi;

