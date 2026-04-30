import PaymentDashboard from "@/components/home/dashboard/PaymentDashboard";
import { DateFilterBar, FinanceBanner, StatCardsGrid } from "@/lib/home";

export default function DashboardPage() {
  return (
    <div className="page-dashboard">
      <DateFilterBar />
      <FinanceBanner />
      <StatCardsGrid />
      <PaymentDashboard />
    </div>
  );
}
