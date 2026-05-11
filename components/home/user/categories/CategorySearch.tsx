"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategorySearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync input with URL
  useEffect(() => {
    const current = searchParams.get("category") || "";
    setQuery(current);
  }, [searchParams]);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Update URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set("category", debouncedQuery);
    } else {
      params.delete("category");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, router, searchParams]);

  // Handle Submit
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("product", query);
      } else {
        params.delete("product");
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [query, router, searchParams]
  );

  // Clear
  const handleClear = useCallback(() => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(newUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto flex flex-col gap-2">

      {/* Search Box */}
      <div
        className="
          group flex items-center gap-0
          bg-white border border-gray-200
          rounded-2xl px-4 py-[5px]
          transition-all duration-200
          focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50
        "
      >
        {/* Left Icon */}
        <Search
          className="
            w-[17px] h-[17px] mr-2.5 shrink-0
            text-gray-400
            transition-colors duration-200
            group-focus-within:text-blue-500
          "
        />

        {/* Input */}
        <input
          type="text"
          placeholder="প্রোডাক্ট খুঁজুন..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          className="
            flex-1 bg-transparent border-none outline-none
            text-[13.5px] text-gray-900 placeholder:text-gray-400
            py-1.5
          "
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear"
            className="
              w-7 h-7 rounded-lg mr-1 shrink-0
              flex items-center justify-center
              text-gray-400 bg-transparent
              hover:bg-red-50 hover:text-red-500
              transition-all duration-150 active:scale-95
            "
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          aria-label="Search"
          className="
            h-[38px] px-4 rounded-xl shrink-0
            bg-blue-500 hover:bg-blue-700
            flex items-center gap-1.5
            text-white text-[12.5px] font-medium
            border-none
            transition-all duration-200
            hover:scale-[1.03] active:scale-[0.97]
          "
        >
          <Search className="w-3.5 h-3.5" />
          খুঁজুন
        </button>
      </div>
    </form>
  );
}