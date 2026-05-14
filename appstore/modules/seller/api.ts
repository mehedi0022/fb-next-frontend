import { baseApi } from "@/appstore/api/baseApi";
import {
    SellerAccountSummaryResponse,
    SellerPaymentHistoryResponse,
    SellerResponse,
    SellerSingleResponse,
} from "@/lib/admin/types";

export type SellerListParams = {
    page?: number;
    limit?: number;
    search?: string;
    branchId?: number;
    batchId?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    dateFrom?: string;
    dateTo?: string;
    status?: string;
    isVerified?: "true" | "false";
    email?: string;
    name?: string;
};

const sellerApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getAllSeller: builder.query<SellerResponse, SellerListParams | void>({
            query: (params) => ({
                url: "/seller",
                params: params ?? undefined,
            }),
            providesTags: ["Seller"]
        }),

        getSellerByid: builder.query<SellerSingleResponse, number>({
            query: (id) => `/seller/profile/${id}`,
            providesTags: ["Seller"]
        }),
        updateSeller: builder.mutation({
            query: ({ id, body }) => ({  
                url: `/seller/update/${id}`,
                method: "PUT",
                body, 
            }),
            invalidatesTags: ["Seller"],
        }),

        createSellerPayment: builder.mutation<
            { success: boolean; message?: string },
            { sellerId: number; amount: number; method: string; type: string; note?: string }
        >({
            query: ({ sellerId, ...body }) => ({
                url: `/seller/payment/${sellerId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Seller"],
        }),

        getSellerAccountSummary: builder.query<SellerAccountSummaryResponse, number>({
            query: (sellerId) => `/seller/account-summery/${sellerId}`,
            providesTags: ["Seller"],
        }),

        getSellerPaymentHistory: builder.query<SellerPaymentHistoryResponse, number>({
            query: (sellerId) => `/seller/payment/history/${sellerId}`,
            providesTags: ["Seller"],
        }),
    })
})


export const {
    useGetAllSellerQuery,
    useGetSellerByidQuery,
    useUpdateSellerMutation,
    useCreateSellerPaymentMutation,
    useGetSellerAccountSummaryQuery,
    useLazyGetSellerAccountSummaryQuery,
    useGetSellerPaymentHistoryQuery,
} = sellerApi;

