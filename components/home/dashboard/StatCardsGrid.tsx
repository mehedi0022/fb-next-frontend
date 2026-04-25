import { STAT_CARDS, StatCardItem } from "@/lib/home";

export default function StatCardsGrid() {
  return (
    <div className="stat-grid">
      {STAT_CARDS.map((card) => (
        <StatCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
