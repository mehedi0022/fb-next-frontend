import { BADGE_COLOR_MAP, formatBDT, StatCard } from "@/lib/home";

interface StatCardProps {
  card: StatCard;
}

export default function StatCardItem({ card }: StatCardProps) {
  const badgeCls = BADGE_COLOR_MAP[card.badgeColor] ?? "bg-gray-400";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{card.icon}</span>
          <p className="text-sm font-semibold text-slate-600">{card.title}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold text-white ${badgeCls}`}>
          {card.badge}
        </span>
      </div>

      <p className="text-2xl font-bold tracking-tight text-slate-900">{formatBDT(card.amount)}</p>

      {card.subItems && card.subItems.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
          {card.subItems.map((sub) => (
            <li key={sub.label} className="flex items-center justify-between text-xs text-slate-500">
              <span>{sub.label}</span>
              <span className="font-medium text-slate-700">{sub.value.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}

      {card.hasBreakdown && (
        <button className="mt-3 text-xs font-semibold text-slate-900 transition hover:text-slate-600">
          View breakdown ?
        </button>
      )}
    </div>
  );
}
