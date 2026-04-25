"use client";

import { DateFilter, Field } from "@/lib/home";
import { useEffect, useState } from "react";

export default function DateFilterBar() {

    const [isMounted, setIsMounted] = useState(false);

    const [filter, setFilter] = useState<DateFilter>({
        fromDate: "",
        toDate: "",
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="date-filter">Loading...</div>;
    }


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
                <Field label="FROM DATE" >
                    <input
                        type="date"
                        className="date-filter__input"
                        value={filter.fromDate}
                        onChange={(e) =>
                            setFilter((prev) => ({ ...prev, fromDate: e.target.value }))
                        }
                    />
                </Field>
            </div>

            <div className="date-filter__field">
                <Field label="TO DATE">
                    <input
                        type="date"
                        className="date-filter__input"
                        value={filter.toDate}
                        onChange={(e) =>
                            setFilter((prev) => ({ ...prev, toDate: e.target.value }))
                        }
                    />

                </Field>
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
