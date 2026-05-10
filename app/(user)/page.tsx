import { Suspense } from "react";
import {
  HowItWorks,
  CategoryList,
  SpecialFeatures,
} from "@/components/home";
import { ProductsList, SearchParamsProps } from "@/lib/home";
import FAQ from "@/components/home/user/home/FAQ";
import Banner from "@/components/home/user/home/Banner";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsProps> | SearchParamsProps;
}) => {
  // Handle both Promise and direct searchParams
  const resolvedParams =
    searchParams instanceof Promise ? await searchParams : searchParams;

  return (
    <>
      {/* Hero Section */}
      <Banner />

      {/* ২. Category List  */}
      <Suspense fallback={<div className="h-40 bg-gray-50 animate-pulse" />}>
        <CategoryList searchParams={resolvedParams} isCarousel={true} />
      </Suspense>

      {/* Products Section */}
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ProductsList searchParams={resolvedParams} />
      </Suspense>
      
      {/* How to work section */}
      <HowItWorks />

      {/* Special Features */}
      <SpecialFeatures />

      {/* FAQ Section */}
      <FAQ />
    </>
  );
};

export default HomePage;
