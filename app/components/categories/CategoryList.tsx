import React, { Suspense } from "react";
import Container from "../common/Container";
import Image from "next/image";
import CategorySearch from "./CategorySearch";
import Title from "../common/Title";
import CategoryCarousel from "../home/CategoryCarousel";
import { SearchParamsProps } from "@/lib";

interface CategoryListProps {
  searchParams: SearchParamsProps;
  isCarousel?: boolean;
}

const CategoryList = async ({ searchParams, isCarousel = false }: CategoryListProps) => {
  const search = searchParams?.category || "";
  const searchText = search.trim().toLowerCase();

  const categories = [
    { name: "New Arrival", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" },
    { name: "Self Defense Items", img: "https://images.unsplash.com/photo-1581091870622-1e7a5b8d0f7f?auto=format&fit=crop&w=800&q=80" },
    { name: "Hot Deals", img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80" },
    { name: "School Bag", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" },
    { name: "Women Bags", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80" },
    { name: "Men Bags", img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80" },
    { name: "Baby Item", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80" },
    { name: "Food Item", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
    { name: "Women's Item", img: "https://images.unsplash.com/photo-1520975922284-3c5b1b3a1f3b?auto=format&fit=crop&w=800&q=80" },
    { name: "Men's Item", img: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80" },
  ];

  const filteredCategories = searchText === ""
    ? categories
    : categories.filter((category) =>
        category.name.toLowerCase().includes(searchText)
      );

  return (
    <section className="py-16 bg-ternary">
      <Container>
        <Title subtitle="আমাদের রয়েছে প্রায় ২০ টিরও বেশি ক্যাটাগরি, যেগুলো আপনি সহজেই অনলাইনে বিক্রি করতে পারবেন।">
          আমাদের ক্যাটাগরির সমূহ
        </Title>

        <Suspense fallback="Loading...">
          <CategorySearch />
        </Suspense>

        {search && (
          <p className="text-sm text-gray-500 mt-2 mb-4">
            Showing results for &quot;{search}&quot;
          </p>
        )}

        <div className="mt-8">
          {filteredCategories.length > 0 ? (
            isCarousel ? (
              <CategoryCarousel categories={filteredCategories} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredCategories.map((cat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 flex flex-col items-center justify-between shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group h-52 border border-gray-100"
                  >
                    <div className="relative w-full h-32 mb-4">
                      <Image
                        src={cat.img}
                        alt={cat.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-700 text-center line-clamp-2">
                      {cat.name}
                    </h3>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-10 text-gray-400">
              No categories found.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default CategoryList;