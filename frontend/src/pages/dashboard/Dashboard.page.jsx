import { assets, menu_list, food_list } from "@/assets/assets";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useState } from "react";
import Menu from "./Menu";
import FoodItems from "./FoodItems";
import Header from "./Header";

const Dashboard = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <Header />
        <Menu category={category} setCategory={setCategory} />
        <FoodItems />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
