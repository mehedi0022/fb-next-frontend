import { baseApi } from "@/appstore/api/baseApi";
import { SellerResponse, SellerSingleResponse,} from "@/lib/admin/types";


const sellerApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getAllSeller: builder.query<SellerResponse, void>({
            query: () => "/seller",
            providesTags: ["Seller"]
        }),

        getSellerByid: builder.query<SellerSingleResponse, number>({
            query: (id) => `/seller/profile/${id}`,
            providesTags: ["Seller"]
        }),
        updateSeller: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/seller/update/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["Seller"]
        })
    })
})


export const { useGetAllSellerQuery, useGetSellerByidQuery, useUpdateSellerMutation } = sellerApi;

