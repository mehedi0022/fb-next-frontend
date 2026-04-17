"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategorySearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const pathname = usePathname()

  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Sync input with URL
  useEffect(() => {
    const current = searchParams.get("category") || "";
    setQuery(current);
  }, [searchParams]);

  // ✅ Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // ✅ Update URL
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
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("product", query);
    } else {
      params.delete("product");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [query, router, searchParams]);


  // ✅ Clear
  const handleClear = useCallback(() => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  return (
    <form onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto" >
      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1.5 pl-4 shadow-sm border border-gray-600">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-lg placeholder:text-gray-400"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-full hover:bg-red-100 transition-all"
          >
            <X className="text-gray-500" size={20} />
          </button>
        )}

        <button
          type="submit"
          className="bg-black/10 p-2 rounded-full"
        >
          <Search className="text-gray-500" size={20} />
        </button>
      </div>
    </form>
  );
}