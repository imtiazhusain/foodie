import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import React, { useState } from "react";
import Menu from "./Menu";
import FoodItems from "./FoodItems";
import Header from "./Header";

const Dashboard = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <div className="px-2 sm:px-6 lg:px-8">
        <Header />
        <Menu category={category} setCategory={setCategory} />
        <FoodItems category={category} />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
