import PaymentDashboard from "@/components/home/dashboard/PaymentDashboard";
import PriceAlertsPanel from "@/components/home/dashboard/PriceAlertsPanel";
import { DateFilterBar, FinanceBanner, StatCardsGrid } from "@/lib/home";

export default function RootPage() {
  return (
    <div className="space-y-5">
      <DateFilterBar />
      <FinanceBanner />
      <StatCardsGrid />
      <PaymentDashboard />
      <PriceAlertsPanel />
    </div>
  );
}
