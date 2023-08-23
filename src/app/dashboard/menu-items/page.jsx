"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateMenuItemModal from "@/components/muiComponents/createMenuItemModal";
import MenuItemDataTable from "@/components/muiComponents/MenuItemDataTable";

const menuItems = () => {
  const [menuItems, setMenuItems] = useState([])

  const fetchAllMenuItems = async()=>{
    try{
      const response = await axios.get("/api/menu-items");
      setMenuItems(response.data.data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchAllMenuItems()
  },[])

  return (
    <>
      <CreateMenuItemModal fetchAllMenuItems={fetchAllMenuItems} />
      <MenuItemDataTable data={menuItems} fetchAllMenuItems={fetchAllMenuItems}/>

      {/* Data Table to Show all the Menu Items:: */}
    </>
  );
};

export default menuItems;
