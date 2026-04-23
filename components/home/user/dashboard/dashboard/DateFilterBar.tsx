"use client";

import { DateFilter } from "@/lib/home";
import { useState } from "react";

export default function DateFilterBar() {
  const [filter, setFilter] = useState<DateFilter>({
    fromDate: "",
    toDate: "",
  });

  const handleLoad = () => {
    // In a real app, this would trigger data re-fetch
    console.log("Loading data for:", filter);
  };

  const handleReset = () => {
    setFilter({ fromDate: "", toDate: "" });
  };

  return (
    <div className="date-filter">
      <div className="date-filter__field">
        <label className="date-filter__label">FROM DATE</label>
        <input
          type="date"
          className="date-filter__input"
          value={filter.fromDate}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, fromDate: e.target.value }))
          }
        />
      </div>

      <div className="date-filter__field">
        <label className="date-filter__label">TO DATE</label>
        <input
          type="date"
          className="date-filter__input"
          value={filter.toDate}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, toDate: e.target.value }))
          }
        />
      </div>

      <button className="date-filter__btn date-filter__btn--load" onClick={handleLoad}>
        Load
      </button>
      <button className="date-filter__btn date-filter__btn--reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
