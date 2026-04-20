import ProductCardSkeleton from "@/components/user/products/productCardSkeleton";
import Container from "@/components/common/Container";
// import { Package, Loader2 } from "lucide-react";

export default function ProductsLoading() {
  return (
    // skeleton loader for products page
    <Container className="py-5">
      <div className="text-center mb-5 animate-pulse">
        {/* Title */}
        <div className="h-8 w-64 bg-gray-300 rounded mx-auto mb-3"></div>

        {/* Subtitle */}
        <div className="h-4 w-96 bg-gray-200 rounded mx-auto"></div>
      </div>

      <div className="w-full max-w-xl mx-auto animate-pulse">
        <div className="flex items-center gap-2 bg-gray-200 rounded-full px-4 py-3 border">
          <div className="h-5 w-full bg-gray-300 rounded"></div>

          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Product card Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 mt-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </Container>

    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    //   <div className="text-center">
    //     <div className="mb-4 relative">
    //       <Package className="w-12 h-12 text-blue-600 mx-auto mb-2" />
    //       <Loader2 className="w-6 h-6 text-blue-400 animate-spin absolute -top-1 -right-1" />
    //     </div>
    //     <h2 className="text-xl font-semibold text-gray-800 mb-2">
    //       প্রোডাক্ট লোড হচ্ছে...
    //     </h2>
    //     <p className="text-gray-600">
    //       সকল প্রোডাক্ট তথ্য আনা হচ্ছে
    //     </p>
    //   </div>
    // </div>
  );
}
