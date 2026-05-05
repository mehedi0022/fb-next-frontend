import { baseApi } from "@/appstore/api/baseApi";
import { SellerResponse } from "@/lib/admin/types";


const sellerApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getAllSeller: builder.query<SellerResponse, void>({
            query: () => "/seller",
            providesTags: ["Seller"]
        }),

        getSellerByid: builder.query<SellerResponse, number>({
            query: (id) => `/seller/profile/${id}`,
            providesTags: ["Seller"]
        }),
    })
})


export const { useGetAllSellerQuery, useGetSellerByidQuery } = sellerApi;

