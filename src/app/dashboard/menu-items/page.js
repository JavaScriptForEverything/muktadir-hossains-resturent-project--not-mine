"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useInput from "@/hooks/useInput";
import axios from "axios";
import CreateMenuItemModal from "@/components/muiComponents/createMenuItemModal";
import MenuItemDataTable from "@/components/muiComponents/MenuItemDataTable";

const menuItems = () => {
  const [menuItems, setMenuItems] = useState([])

  const fetchAllMenuItems = async()=>{
    try{
      const response = await axios.get("/api/menu-items");
      console.log(response.data.data)
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
      <CreateMenuItemModal/>
      <MenuItemDataTable data={menuItems}/>

      {/* Data Table to Show all the Menu Items:: */}
    </>
  );
};

export default menuItems;
