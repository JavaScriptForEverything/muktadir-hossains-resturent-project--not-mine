"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateMenuItemModal from "@/components/muiComponents/createMenuItemModal";
import MenuItemDataTable from "@/components/muiComponents/MenuItemDataTable";
import LoadingGraph from "@/components/small/LoadingGraph";

const menuItems = () => {
  const [menuItems, setMenuItems] = useState([])

  const fetchAllMenuItems = async()=>{
    try{
      const response = await axios.get("/api/menu-items");
      setMenuItems(response?.data?.data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchAllMenuItems()
  },[])

  return (
    <div className="min-h-screen">
      <CreateMenuItemModal fetchAllMenuItems={fetchAllMenuItems} />
      {/* Show Menu Items Table conditionally :: */}
      {
        menuItems.length>0 ? 
        <MenuItemDataTable data={menuItems} fetchAllMenuItems={fetchAllMenuItems}/>
        :
        <LoadingGraph />
      }

      {/* Data Table to Show all the Menu Items:: */}
    </div>
  );
};

export default menuItems;
