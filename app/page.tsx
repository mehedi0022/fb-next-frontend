import { Suspense } from "react";
import HowItWorks from "./components/about/HowItWorks";
import CategoryList from "./components/categories/CategoryList";
import Banner from "./components/home/Bannar";
import SpecialFeatures from "./components/home/SpecialFeatures";
import ProductsList from "./components/products/ProductsList";


interface SearchParamsProps {
  product?: string;
  category?: string;
}

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsProps> | SearchParamsProps;
}) => {

  const resolvedParams = await searchParams;

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

      {/* {/. Products Section /} */}
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ProductsList searchParams={resolvedParams} />
      </Suspense>

    </>
  );
};

export default HomePage;
