"use client";

import { useGetAllSellerQuery } from "@/appstore/modules/seller/api";
import { useLazyGetSellerAccountSummaryQuery } from "@/appstore/modules/seller/api";
import {
  useGetAllPackagesQuery,
  useSetSellerPackageMutation,
} from "@/appstore/modules/packages/api";
import { ReusableTable } from "@/components/admin/common/ReusableTable";
import LoadingSkeleton from "@/components/admin/common/Skeleton";
import { PackageItem, Seller } from "@/lib/admin/types";
import { AppModal } from "@/components/admin/common/AppModal";
import { Button, Card, Empty, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type ApiError = {
  data?: {
    message?: string;
  };
};

export default function PendingStudents() {
  const { data, isLoading } = useGetAllSellerQuery();
  const { data: packageData, isLoading: packageLoading } =
    useGetAllPackagesQuery();
  const [setSellerPackage, { isLoading: settingPackage }] =
    useSetSellerPackageMutation();
  const [getSellerAccountSummary, { isFetching: accountSummaryLoading }] =
    useLazyGetSellerAccountSummaryQuery();

  const [seller, setSeller] = useState<Seller[]>([]);
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
    null,
  );
  const [initialPaymentDone, setInitialPaymentDone] = useState(false);

  useEffect(() => {
    if (!data?.data) return;
    const pendingSellers = data.data.filter(
      (item) => item.status === "pending",
    );
    setSeller(pendingSellers);
  }, [data]);

  const getErrorMessage = (error: unknown, fallback: string) => {
    const apiError = error as ApiError;
    return apiError?.data?.message || fallback;
  };

  const activePackages = (packageData?.data || []).filter(
    (pkg: PackageItem) => pkg.status === "active",
  );
  const toCurrency = (value?: string | number) =>
    `৳ ${Number(value || 0).toLocaleString()}`;
  const getSellerPackageId = (item: Seller | null) =>
    item
      ? (item.sellerPackageId ?? item.sellerAccount?.sellerPackageId ?? null)
      : null;
  const getSellerPackageName = (item: Seller | null) =>
    item
      ? (item.sellerPackageName ??
        item.sellerPackage?.name ??
        item.sellerAccount?.sellerPackage?.name ??
        null)
      : null;

  const openPackageModal = async (targetSeller: Seller) => {
    setSelectedSeller(targetSeller);
    setSelectedPackageId(getSellerPackageId(targetSeller));
    setInitialPaymentDone(false);
    setPackageModalOpen(true);

    try {
      const response = await getSellerAccountSummary(targetSeller.id).unwrap();
      const totalPaid = Number(response?.data?.totalPaid || 0);
      setInitialPaymentDone(totalPaid >= 2000);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to load account summary."));
    }
  };

  const closePackageModal = () => {
    if (settingPackage || accountSummaryLoading) return;
    setPackageModalOpen(false);
    setSelectedPackageId(null);
    setSelectedSeller(null);
    setInitialPaymentDone(false);
  };

  const handleSetPackage = async () => {
    if (!selectedSeller?.id || !selectedPackageId) {
      toast.warning("Select a package first.");
      return;
    }

    if (initialPaymentDone && selectedSeller?.sellerPackageId) {
      toast.warning(
        "Initial payment already completed. Package cannot be changed.",
      );
      return;
    }

    try {
      const result = await setSellerPackage({
        sellerId: selectedSeller.id,
        sellerPackageId: selectedPackageId,
      }).unwrap();

      if (result?.success) {
        const pickedPackage =
          activePackages.find((pkg) => pkg.id === selectedPackageId) || null;
        setSeller((previous) =>
          previous.map((item) =>
            item.id === selectedSeller.id
              ? {
                  ...item,
                  sellerPackageId: selectedPackageId,
                  sellerPackage: pickedPackage,
                  sellerPackageName:
                    pickedPackage?.name || item.sellerPackageName,
                }
              : item,
          ),
        );
        toast.success(result?.message || "Package assigned successfully.");
        closePackageModal();
        return;
      }

      toast.error(result?.message || "Failed to assign package.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to assign package."));
    }
  };

  // Colums
  const columns: ColumnsType<Seller> = [
    {
      title: "SI",
      width: 80,
      align: "center",
      render: (_: unknown, __: Seller, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            status === "approved"
              ? "bg-green-100 text-green-600"
              : status === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
          }`}>
          {status}
        </span>
      ),
    },
    {
      title: "Shop Name",
      dataIndex: "page_name",
      align: "center",
      render: (shopName: string) => shopName || "N/A",
    },
    {
      title: "Address",
      dataIndex: "address",
      align: "center",
      render: (address: string) => address || "N/A",
    },
    {
      title: "Package",
      dataIndex: "sellerPackageName",
      align: "center",
      render: (_: unknown, record: Seller) => {
        const packageName = getSellerPackageName(record);
        return packageName || "Not Assigned";
      },
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      align: "center",
      render: (_: unknown, record: Seller) =>
        toCurrency(record.totalAmount ?? record.sellerAccount?.totalAmount),
    },
    {
      title: "Paid",
      dataIndex: "totalPaid",
      align: "center",
      render: (_: unknown, record: Seller) =>
        toCurrency(record.totalPaid ?? record.sellerAccount?.totalPaid),
    },
    {
      title: "Due",
      dataIndex: "dueAmount",
      align: "center",
      render: (_: unknown, record: Seller) =>
        toCurrency(record.dueAmount ?? record.sellerAccount?.dueAmount),
    },
    {
      title: "Action",
      align: "end",
      render: (_, r) => {
        return (
          <Space>
            <Link href={`/admin/students/pending/edit/${r.id}`}>
              <Button type="primary" size="small">
                Edit
              </Button>
            </Link>

            <Button
              type="primary"
              className="!bg-black"
              size="small"
              onClick={() => openPackageModal(r)}>
              {getSellerPackageId(r) ? "Package Selected" : "Set Package"}
            </Button>

            {getSellerPackageId(r) ? (
              <Link href={`/admin/students/payment/${r.id}`}>
                <Button size="small">Make Payment</Button>
              </Link>
            ) : (
              <Button size="small" disabled>
                Make Payment
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <ReusableTable
        columns={columns}
        data={seller}
        loading={isLoading}
        loadingComponent={<LoadingSkeleton />}
      />

      <AppModal
        open={packageModalOpen}
        onClose={closePackageModal}
        title={`${getSellerPackageId(selectedSeller) ? "Change" : "Set"} Package${selectedSeller?.name ? ` - ${selectedSeller.name}` : ""}`}
        width={760}>
        <div className="space-y-4">
          {selectedSeller && getSellerPackageName(selectedSeller) && (
            <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm text-blue-700">
              Current package:{" "}
              <span className="font-semibold">
                {getSellerPackageName(selectedSeller)}
              </span>
            </div>
          )}
          {initialPaymentDone &&
            selectedSeller &&
            getSellerPackageId(selectedSeller) && (
              <div className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                Initial payment is completed. Package change is locked.
              </div>
            )}

          {packageLoading || accountSummaryLoading ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-lg border border-slate-200 bg-slate-100"
                />
              ))}
            </div>
          ) : activePackages.length === 0 ? (
            <Empty description="No active package available" />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {activePackages.map((pkg: PackageItem) => {
                const selected = selectedPackageId === pkg.id;
                return (
                  <Card
                    key={pkg.id}
                    hoverable
                    onClick={() => {
                      if (
                        initialPaymentDone &&
                        selectedSeller &&
                        getSellerPackageId(selectedSeller)
                      )
                        return;
                      setSelectedPackageId(pkg.id);
                    }}
                    className={`cursor-pointer border transition-all ${
                      selected
                        ? "!border-blue-500 !bg-blue-50"
                        : "!border-slate-200"
                    }`}>
                    <h3 className="text-base font-semibold text-slate-900">
                      {pkg.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      BDT {Number(pkg.price).toLocaleString()}
                    </p>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              onClick={closePackageModal}
              disabled={settingPackage || accountSummaryLoading}>
              Cancel
            </Button>
            <Button
              type="primary"
              loading={settingPackage}
              disabled={
                !selectedPackageId ||
                activePackages.length === 0 ||
                (initialPaymentDone &&
                  !!(selectedSeller && getSellerPackageId(selectedSeller)))
              }
              onClick={handleSetPackage}>
              {selectedSeller && getSellerPackageId(selectedSeller)
                ? "Change Package"
                : "Set Package"}
            </Button>
          </div>
        </div>
      </AppModal>
    </div>
  );
}
