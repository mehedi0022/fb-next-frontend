import { Suspense } from "react";
import HowItWorks from "./components/about/HowItWorks";
import CategoryList from "./components/categories/CategoryList";
import Banner from "./components/home/Bannar";
import SpecialFeatures from "./components/home/SpecialFeatures";
import ProductsList from "./components/products/ProductsList";

const HomePage = ({
  searchParams,
}: {
  searchParams: { product?: string };
}) => {

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
        <CategoryList />
      </Suspense>

      {/* {/. Products Section /} */}
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ProductsList searchParams={searchParams} />
      </Suspense>

    </>
  );
};

export default HomePage;
