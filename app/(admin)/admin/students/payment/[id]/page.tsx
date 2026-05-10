"use client";

import {
  useCreateSellerPaymentMutation,
  useGetSellerAccountSummaryQuery,
  useGetSellerPaymentHistoryQuery,
} from "@/appstore/modules/seller/api";
import AccountSummaryCard from "@/components/admin/students/payment/AccountSummaryCard";
import PaymentFormCard, {
  SellerPaymentFormValues,
} from "@/components/admin/students/payment/PaymentFormCard";
import PaymentHistoryTable from "@/components/admin/students/payment/PaymentHistoryTable";
import { Button } from "antd";
import Link from "next/link";
import { toast } from "react-toastify";

type Props = {
  params: {
    id: string;
  };
};

export default function StudentPaymentPage({ params }: Props) {
  const sellerId = Number(params.id);

  const { data: summaryResponse, isLoading: summaryLoading } =
    useGetSellerAccountSummaryQuery(sellerId, {
      skip: Number.isNaN(sellerId),
    });

  const { data: historyResponse, isLoading: historyLoading } =
    useGetSellerPaymentHistoryQuery(sellerId, {
      skip: Number.isNaN(sellerId),
    });

  const [createPayment, { isLoading: paymentLoading }] =
    useCreateSellerPaymentMutation();

  const handleCreatePayment = async (values: SellerPaymentFormValues) => {
    try {
      const result = await createPayment({
        sellerId,
        amount: values.amount,
        method: values.method,
        type: values.type,
        note: values.note,
      }).unwrap();

      if (result?.success) {
        toast.success("Payment added successfully.");
        return;
      }

      toast.error("Failed to create payment.");
    } catch {
      toast.error("Failed to create payment.");
    }
  };

  if (Number.isNaN(sellerId)) {
    return <div className="p-4 text-red-600">Invalid seller id.</div>;
  }

  return (
    <div className="space-y-5 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">
          Seller Payment Management
        </h1>
        <Link href="/admin/students/pending">
          <Button>Back</Button>
        </Link>
      </div>

      <AccountSummaryCard summary={summaryResponse?.data} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <PaymentFormCard
            loading={paymentLoading}
            onSubmit={handleCreatePayment}
          />
        </div>
        <div className="xl:col-span-2">
          <PaymentHistoryTable
            data={historyResponse?.data || []}
            loading={historyLoading || summaryLoading}
          />
        </div>
      </div>
    </div>
  );
}
