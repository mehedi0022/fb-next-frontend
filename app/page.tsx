import Banner from "./components/home/Bannar";
import ProductsList from "./components/products/ProductsList";

const HomePage = () => {
  
  return (
    <>
      {/* Hero Section */}
      <Banner />

      {/* Products Section */}
      <ProductsList />
    </>
  );
};

export default HomePage;
