'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  category: {
    name: string;
    img: string;
    badge?: string; 
    slug?: string;  
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { name, img, badge, slug } = category;

  return (
    <Link
      href={slug ? `/categories/${slug}` : "#"}
      className="
        group flex flex-col gap-3 bg-white rounded-2xl overflow-hidden
        border border-gray-200 cursor-pointer
        transition-all duration-300 ease-[cubic-bezier(.22,.68,0,1.2)]
        hover:-translate-y-1.5 hover:border-blue-400
      "
    >
      {/* ── Image Zone ── */}
      <div className="
        relative aspect-square overflow-hidden
        bg-blue-50 group-hover:bg-blue-100
        transition-colors duration-300
      ">

        {/* Corner Badge */}
        {badge && (
          <span className="
            absolute top-0 left-0 z-10
            text-[9px] font-medium tracking-wider
            px-2.5 py-1 rounded-br-xl
            bg-blue-500 text-blue-50
          ">
            {badge}
          </span>
        )}

        {/* Image */}
        <Image
          src={img}
          alt={name}
          fill
          className="
            object-cover
            group-hover:scale-110
            transition-transform duration-300 ease-[cubic-bezier(.22,.68,0,1.2)]
          "
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 150px"
          loading="lazy"
        />
      </div>

      {/* ── Name Row ── */}
      <div className="flex items-center justify-between gap-1 px-2.5 py-2">
        <span className="
          text-[11px] font-medium text-gray-800 leading-snug
          group-hover:text-blue-600
          transition-colors duration-200
        ">
          {name}
        </span>
        <ChevronRight className="
          w-3.5 h-3.5 text-gray-400 shrink-0
          group-hover:text-blue-500 group-hover:translate-x-0.5
          transition-all duration-200
        " />
      </div>
    </Link>
  );
}