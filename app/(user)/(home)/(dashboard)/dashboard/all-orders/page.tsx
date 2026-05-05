import dynamic from "next/dynamic"

const AllOrdersPage = dynamic(
  () => import("@/components/home/dashboard/AllOrdersPage"),  
  { ssr: false }
)

export default function Page() {
  return <AllOrdersPage />
}