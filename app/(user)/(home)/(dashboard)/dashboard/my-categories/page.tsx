import dynamic from "next/dynamic";

const MyCategoriesPage = dynamic(
  () => import("@/components/home/dashboard/MyCategoriesPage"),
  { ssr: false }  
)

export default function Page() {
  return <MyCategoriesPage />
}