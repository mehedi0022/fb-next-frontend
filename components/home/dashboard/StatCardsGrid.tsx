import { STAT_CARDS, StatCardItem } from "@/lib/home";

export default function StatCardsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {STAT_CARDS.map((card) => (
        <StatCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
