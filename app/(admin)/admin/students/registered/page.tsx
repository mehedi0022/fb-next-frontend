"use client"

import { useGetAllSellerQuery } from "@/appstore/modules/seller/api"
import { ReusableTable } from "@/components/admin/common/ReusableTable"
import LoadingSkeleton from "@/components/admin/common/Skeleton"
import { Seller } from "@/lib/admin/types"
import { Button, Space } from "antd"
import { ColumnsType } from "antd/es/table"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function RegisteredStudents() {
    const { data, isLoading } = useGetAllSellerQuery()
    const [seller, setSeller] = useState<Seller[]>([])
    const toCurrency = (value?: string | number) =>
        `BDT ${Number(value || 0).toLocaleString()}`
    const getSellerPackageName = (item: Seller) =>
        item.sellerPackageName ??
        item.sellerPackage?.name ??
        item.sellerAccount?.sellerPackage?.name ??
        null

    useEffect(() => {
        if (data?.data) {
            const registerSellers = data?.data.filter((seller) => seller.status === 'approved');
            setSeller(registerSellers)
        }
    }, [data])

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
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Status",
            dataIndex: "status",
            align: "center",
            render: (status: string) => (
                <span
                    className={`px-2 py-1 rounded text-xs ${status === "approved"
                        ? "bg-green-100 text-green-600"
                        : status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                >
                    {status}
                </span>
            ),
        },
        {
            title: "Shop Name",
            dataIndex: "page_name",
            render: (shopName: string) => shopName || "N/A",
        },
        {
            title: "Address",
            dataIndex: "address",
            render: (address: string) => address || "N/A",
        },
        {
            title: "Package",
            dataIndex: "sellerPackageName",
            render: (_: unknown, record: Seller) => getSellerPackageName(record) || "Not Assigned",
        },
        {
            title: "Total",
            dataIndex: "totalAmount",
            align: "right",
            render: (_: unknown, record: Seller) =>
                toCurrency(record.totalAmount ?? record.sellerAccount?.totalAmount),
        },
        {
            title: "Paid",
            dataIndex: "totalPaid",
            align: "right",
            render: (_: unknown, record: Seller) =>
                toCurrency(record.totalPaid ?? record.sellerAccount?.totalPaid),
        },
        {
            title: "Due",
            dataIndex: "dueAmount",
            align: "right",
            render: (_: unknown, record: Seller) =>
                toCurrency(record.dueAmount ?? record.sellerAccount?.dueAmount),
        },
        {
            title: "Action",
            align: "center",
            render: (_, r) => {
                return (
                    <Space>
                        <Link href={`/admin/students/pending/edit/${r.id}`}>
                            <Button type="primary" size="small">
                                Edit
                            </Button>
                        </Link>

                        <Link href={`#`}>
                            <Button type="primary" className="bg-lime-700" size="small">
                               View
                            </Button>
                        </Link>

                        <Link href={`#`}>
                            <Button type="primary" className="bg-green-800 " size="small">
                               Payment
                            </Button>
                        </Link>
                        <Link href={`#`}>
                            <Button type="primary" className="bg-sky-500" size="small">
                              Complete
                            </Button>
                        </Link>
                        <Link href={`#`}>
                            <Button type="primary" className="bg-red-500" size="small">
                              Invoice
                            </Button>
                        </Link>
                    </Space>
                )
            },
        },

    ];

    return (
        <div>
            <ReusableTable columns={columns} data={seller} loading={isLoading} loadingComponent={<LoadingSkeleton />} />
        </div>
    )
}
