"use client";
import OrderSectionWrapper from "@/components/ordering-section/OrderSectionWrapper";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {
  const [allFoodItems, setAllMenuItems] = useState([]);

  const fetchDataFromServer = async () => {
    const allMenuData = await axios.get(`/api/all-menu-items`);
    const menuData = allMenuData?.data?.menuData;
    console.log(menuData);
    setAllMenuItems(menuData);
  };
  useEffect(() => {
    fetchDataFromServer();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 relative dark:bg-slate-900 dark:text-slate-200 ">
      <div className="absolute left-[8%] top-28 hidden rotate-12 rounded-3xl bg-sky-800 opacity-90 blur-3xl filter dark:opacity-30 lg:h-32 lg:w-[450px] dark:lg:block xl:h-44 xl:w-[600px]"></div>
      <OrderSectionWrapper allFoodItems={allFoodItems} />
    </main>
  );
}
