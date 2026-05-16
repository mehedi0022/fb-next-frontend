import { FINANCE_SUMMARY, formatBDT } from "@/lib/home";

export default function FinanceBanner() {
  const f = FINANCE_SUMMARY;

  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 text-white shadow-lg sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">
            Current Balance
          </p>
          <p className={`mt-2 text-3xl font-bold tracking-tight ${f.currentBalance < 0 ? "text-rose-300" : "text-white"}`}>
            {formatBDT(f.currentBalance)}
          </p>
        </div>

        <button className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20">
          Details
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/15 pt-4 sm:grid-cols-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.1em] text-slate-300">Deposit</p>
          <p className="mt-1 text-base font-semibold">{formatBDT(f.depositAmount)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.1em] text-slate-300">Total Paid</p>
          <p className="mt-1 text-base font-semibold">{formatBDT(f.totalPaid)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.1em] text-slate-300">Reserved</p>
          <p className="mt-1 text-base font-semibold">{formatBDT(f.reserved)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.1em] text-slate-300">Withdrawable</p>
          <p className="mt-1 text-base font-semibold">{formatBDT(f.withdrawable)}</p>
        </div>
      </div>
    </div>
  );
}
