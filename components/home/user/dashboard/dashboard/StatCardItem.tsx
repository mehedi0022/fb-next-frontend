import { BADGE_COLOR_MAP, formatBDT, StatCard } from "@/lib/home";


interface StatCardProps {
  card: StatCard;
}

export default function StatCardItem({ card }: StatCardProps) {
  const badgeCls = BADGE_COLOR_MAP[card.badgeColor] ?? "bg-gray-400";

  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <div className="stat-card__title-row">
          <span className="stat-card__icon">{card.icon}</span>
          <span className="stat-card__title">{card.title}</span>
        </div>
        <span className={`stat-card__badge ${badgeCls}`}>{card.badge}</span>
      </div>

      <p className="stat-card__amount">{formatBDT(card.amount)}</p>

      {card.subItems && card.subItems.length > 0 && (
        <ul className="stat-card__sub-list">
          {card.subItems.map((sub) => (
            <li key={sub.label} className="stat-card__sub-item">
              <span>{sub.label}</span>
              <span>{sub.value.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}

      {card.hasBreakdown && (
        <button className="stat-card__breakdown">
          View breakdown →
        </button>
      )}
    </div>
  );
}
