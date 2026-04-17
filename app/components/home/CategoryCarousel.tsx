"use client"; 
import { Carousel } from 'antd';
import Image from "next/image";

interface Category {
  name: string;
  img: string;
}

export default function CategoryCarousel({ categories = [] }: { categories?: Category[] }) {
  const settings = {
    dots: true,
    infinite: (categories?.length ?? 0) > 4, 
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { 
        breakpoint: 1280, 
        settings: { 
          slidesToShow: 5,
          slidesToScroll: 1
        } 
      },
      { 
        breakpoint: 1024, 
        settings: { 
          slidesToShow: 4,
          slidesToScroll: 1
        } 
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 3,
          slidesToScroll: 1
        } 
      },
      { 
        breakpoint: 640, 
        settings: { 
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        } 
      },
      { 
        breakpoint: 480, 
        settings: { 
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        } 
      },
    ],
  };

  if (!categories || categories.length === 0) return null;

  return (
    <div className="category-carousel w-full">
      <Carousel {...settings} arrows={true}>
        {categories.map((cat, index) => (
          <div key={index} className="px-1 sm:px-2 pb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 flex flex-col items-center h-40 sm:h-48 justify-between shadow-sm hover:shadow-md transition-all group mx-1">
              <div className="relative w-full h-20 sm:h-24 mb-2 sm:mb-3">
                <Image 
                   src={cat.img} 
                   alt={cat.name} 
                   fill 
                   className="object-contain group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-center text-gray-700 line-clamp-2 px-1 leading-tight">
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}