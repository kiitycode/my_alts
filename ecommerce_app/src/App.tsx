import React from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";

const App: React.FC = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <ProductCard />
    </div>
  );
};

export default App;
