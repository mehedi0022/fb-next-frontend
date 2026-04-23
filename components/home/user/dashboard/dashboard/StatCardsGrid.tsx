import { STAT_CARDS } from "@/lib/home";
import StatCardItem from "./StatCardItem";

export default function StatCardsGrid() {
  return (
    <div className="stat-grid">
      {STAT_CARDS.map((card) => (
        <StatCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
