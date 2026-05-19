"use client"; 
import Slider from "react-slick";
import CategoryCard from "../categories/CategoryCard";

interface Category {
  id?: number;
  name: string;
  img: string;
  slug?: string;
  href?: string;
  isAdded?: boolean;
}

export default function CategoryCarousel({
  categories = [],
  showAddButton = false,
  creatingCategory = false,
  onAddCategory,
}: {
  categories?: Category[];
  showAddButton?: boolean;
  creatingCategory?: boolean;
  onAddCategory?: (categoryId: number) => void;
}) {
  const settings = {
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
      <Slider {...settings} arrows={true}>
        {categories.map((cat, index) => (
          <div key={index} className="px-2">
            <CategoryCard
              category={cat}
              showAddButton={showAddButton}
              creatingCategory={creatingCategory}
              onAddCategory={onAddCategory}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
