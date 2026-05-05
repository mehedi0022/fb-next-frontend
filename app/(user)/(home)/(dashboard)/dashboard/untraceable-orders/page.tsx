import dynamic from "next/dynamic";

const UntrackedOrdersPage = dynamic(
  () => import("@/components/home/dashboard/UntrackedOrdersPage"),
  { ssr: false }
)

export default function Page() {
  return <UntrackedOrdersPage />
}