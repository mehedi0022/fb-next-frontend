import React, { Suspense } from "react";
import Container from "../../common/Container";
import CategorySearch from "./CategorySearch";
import Title from "../../common/Title";
import CategoryCarousel from "../home/CategoryCarousel";
import { SearchParamsProps } from "@/lib/home";
import CategoryCard from "./CategoryCard";

interface CategoryListProps {
  searchParams: SearchParamsProps;
  isCarousel?: boolean;
}

const CategoryList = ({ searchParams, isCarousel = false }: CategoryListProps) => {
  const search = searchParams?.category || "";
  const searchText = search.trim().toLowerCase();

 const categories = [
  {
    name: "New Arrival",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Travel Accessories",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Hot Deals",
    img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "School Bag",
    img: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Women Bags",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Men Bags",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Baby Item",
    img: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Food Item",
    img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Women's Item",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Men's Item",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  },
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

        <Suspense fallback={<div>Loading...</div>}>
          <CategorySearch />
        </Suspense>

        {search && (
          <p className="text-sm text-gray-500 mt-2 mb-4">
            Showing results for &ldquo;{search}&rdquo;
          </p>
        )}

        <div className="mt-8">
          {filteredCategories.length > 0 ? (
            isCarousel ? (
              <CategoryCarousel categories={filteredCategories} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredCategories.map((cat, index) => (
                  <CategoryCard key={index} category={cat} />
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