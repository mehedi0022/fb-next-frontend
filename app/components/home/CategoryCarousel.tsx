"use client"; 
import { Carousel } from 'antd';
import Image from "next/image";

export default function CategoryCarousel({ categories = [] }: { categories?: any[] }) {
  const settings = {
    dots: true,
    infinite: (categories?.length ?? 0) > 6, 
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  if (!categories || categories.length === 0) return null;

  return (
    <div className="category-carousel w-full">
      <Carousel {...settings} arrows={true}>
        {categories.map((cat, index) => (
          <div key={index} className="px-2 pb-12"> {/* pb-12 ensure dots are visible */}
            <div className="bg-slate-200 border border-gray-400 rounded-lg p-4 flex flex-col items-center h-52 justify-between shadow-sm hover:shadow-md transition-all group">
              <div className="relative w-full h-28 mb-4">
                <Image 
                   src={cat.img} 
                   alt={cat.name} 
                   fill 
                   className="object-contain group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <h3 className="text-sm font-semibold text-center text-primary line-clamp-1">
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}