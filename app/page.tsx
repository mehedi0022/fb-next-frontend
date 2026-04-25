import { Suspense } from "react";
import { HowItWorks, CategoryList, Bannar as Banner, SpecialFeatures,} from "@/components/home";
import { ProductsList, SearchParamsProps } from "@/lib/home";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsProps> | SearchParamsProps;
}) => {
  // Handle both Promise and direct searchParams
  const resolvedParams = searchParams instanceof Promise ? await searchParams : searchParams;

  return (
    <>

      {/* Hero Section */}
      <Banner />

      {/* How to work section */}
      <HowItWorks />

      {/* Special Features */}
      <SpecialFeatures />

      {/* ২. Category List  */}
      <Suspense fallback={<div className="h-40 bg-gray-50 animate-pulse" />}>
        <CategoryList searchParams={resolvedParams} isCarousel={true} />
      </Suspense>

      {/* Products Section */}
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ProductsList searchParams={resolvedParams} />
      </Suspense>
    </>
  );
};

export default HomePage;