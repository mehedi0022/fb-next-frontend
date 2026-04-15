import React from "react";
import Container from "../common/Container";
import Image from "next/image";
import CategorySearch from "./CategorySearch";

const CategoryList = () => {
   const categories = [
  {
    name: "New Arrival",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Self Defense Items",
    img: "https://images.unsplash.com/photo-1581091870622-1e7a5b8d0f7f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Hot Deals",
    img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "School Bag",
    img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Women Bags",
    img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Men Bags",
    img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Baby Item",
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Food Item",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Women's Item",
    img: "https://images.unsplash.com/photo-1520975922284-3c5b1b3a1f3b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Men's Item",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80",
  },
];

  return (
    <section className="py-16 bg-ternary">
      <Container>
        {/* Title & Search Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
            আমাদের ক্যাটাগরির সমূহ
          </h2>
          
          {/* Search */}
          <CategorySearch />
          
          <p className="text-neutral-700 font-medium">
            আমাদের রয়েছে প্রায় ২০ টিরও বেশি ক্যাটাগরি, যেগুলো আপনি সহজেই অনলাইনে বিক্রি করতে পারবেন।
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 flex flex-col items-center justify-between shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <div className="relative w-full h-32 mb-4">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-neutral-700 text-center line-clamp-2">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
};

export default CategoryList;