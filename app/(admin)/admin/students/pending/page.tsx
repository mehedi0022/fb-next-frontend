"use client"

import { useGetAllSellerQuery } from "@/appstore/modules/seller/api"
import { ReusableTable } from "@/components/admin/common/ReusableTable"
import { Seller } from "@/lib/admin/types"
import { Button, Space } from "antd"
import { ColumnsType } from "antd/es/table"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function PendingStudents() {
    const { data, isLoading } = useGetAllSellerQuery()
    const [seller, setSeller] = useState<Seller[]>([])

    useEffect(() => {
        if (data?.data) {
            const pendingSellers = data?.data.filter((seller) => seller.status === 'pending');
            setSeller(pendingSellers)
        }
    }, [data])

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
            dataIndex: "shopName",
            render: (shopName: string) => shopName || "N/A",
        },
        {
            title: "Address",
            dataIndex: "address",
            render: (address: string) => address || "N/A",
        },
        {
            title: "Action",
            align: "center",
            render: (_, r) => {
                console.log("Row data:", r)  
                return (
                    <Space>
                        <Link href={`/admin/students/pending/edit/${r.id}`}>
                            <Button type="primary" size="small">
                                Edit
                            </Button>
                        </Link>
                    </Space>
                )
            },
        },

    ];

    return (
        <div>
            <ReusableTable columns={columns} data={seller} loading={isLoading} />
        </div>
    )
}
