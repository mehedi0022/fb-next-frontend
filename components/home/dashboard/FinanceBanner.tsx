import { FINANCE_SUMMARY, formatBDT } from "@/lib/home";

export default function FinanceBanner() {
  const f = FINANCE_SUMMARY;

  return (
    <div className="finance-banner">
      <button className="finance-banner__details-btn">Details</button>

      <div className="finance-banner__row">
        <div className="finance-col">
          <p className="finance-col__label">CURRENT BALANCE</p>
          <p className={`finance-col__amount ${f.currentBalance < 0 ? "finance-col__amount--negative" : ""}`}>
            {formatBDT(f.currentBalance)}
          </p>
        </div>
        <div className="finance-col finance-col--right">
          <p className="finance-col__label">DEPOSIT AMOUNT</p>
          <p className="finance-col__amount">{formatBDT(f.depositAmount)}</p>
        </div>
      </div>

      <div className="finance-banner__row finance-banner__row--sub">
        <div className="finance-col">
          <p className="finance-col__label">TOTAL PAID</p>
          <p className="finance-col__sub-amount">{formatBDT(f.totalPaid)}</p>
        </div>
        <div className="finance-col finance-col--center">
          <p className="finance-col__label">RESERVED</p>
          <p className="finance-col__sub-amount">{formatBDT(f.reserved)}</p>
        </div>
        <div className="finance-col finance-col--right">
          <p className="finance-col__label">WITHDRAWABLE</p>
          <p className="finance-col__sub-amount">{formatBDT(f.withdrawable)}</p>
        </div>
      </div>
    </div>
  );
}
