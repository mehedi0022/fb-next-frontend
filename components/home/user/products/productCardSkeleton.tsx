import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="w-full h-full flex flex-col bg-white border border-gray-400 rounded-sm overflow-hidden animate-pulse">
      
      {/* Image Skeleton */}
      <div className="m-2 border border-gray-300 rounded-sm overflow-hidden">
        <div className="w-full aspect-square bg-gray-200" />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-3">
        
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Button Skeleton */}
        <div className="mt-2 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="h-10 bg-gray-300 rounded w-full" />
        </div>
      </div>
    </div>
  );
}