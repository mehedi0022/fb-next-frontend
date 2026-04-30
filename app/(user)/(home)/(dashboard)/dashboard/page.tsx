import { DateFilterBar, FinanceBanner, StatCardsGrid } from "@/lib/home";

export default function RootPage() {
  return (
    <div className="page-dashboard">
      <DateFilterBar />
      <FinanceBanner />
      <StatCardsGrid />
    </div>
  );
}
