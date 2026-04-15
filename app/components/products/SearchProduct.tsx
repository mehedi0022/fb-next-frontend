"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Update URL on debounce
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    } else {
      params.delete("q");
    }

    router.push(`?${params.toString()}`);
  }, [debouncedQuery, router, searchParams]);

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", query);
    router.push(`?${params.toString()}`);
  };

  // Clear search
  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1.5 pl-4 shadow-sm">
        {/* Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-lg placeholder:text-gray-400"
        />

        {/* Clear BTN */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-full hover:bg-red-100 transition-all"
          >
            <X className="text-gray-500" size={20} />
          </button>
        )}

        {/* Submit BTN */}
        <button
          type="submit"
          className="bg-black/10 text-white p-2 rounded-full hover:bg-black/15 transition"
        >
          <Search className="text-gray-500" size={20} />
        </button>
      </div>
    </form>
  );
}
