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

      {/* Category List */}
      <CategoryList />

      {/* Products Section */}
      <ProductsList searchParams={searchParams} />

    </>
  );
};

export default HomePage;
