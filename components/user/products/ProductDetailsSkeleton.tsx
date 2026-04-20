const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-3 gap-6 animate-pulse">
      
      {/* LEFT SIDE */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="w-full aspect-square bg-gray-300 rounded-xl"></div>

        {/* Thumbnails */}
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-14 h-14 bg-gray-300 rounded-md"
            ></div>
          ))}
        </div>

        {/* Video */}
        <div>
          <div className="h-4 w-28 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-[180px] bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="border rounded-xl p-4 bg-white space-y-4 md:col-span-2">
        
        {/* Title */}
        <div className="h-6 w-2/3 bg-gray-300 rounded"></div>

        {/* Category */}
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>

        {/* Price Section */}
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-5 w-24 bg-gray-300 rounded-full"></div>
        </div>

        {/* Stock */}
        <div className="h-6 w-40 bg-gray-300 rounded-full"></div>

        {/* ID */}
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;