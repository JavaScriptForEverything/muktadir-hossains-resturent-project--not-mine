"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateMenuItemModal from "@/components/muiComponents/createMenuItemModal";
import MenuItemDataTable from "@/components/muiComponents/MenuItemDataTable";
import LoadingGraph from "@/components/small/LoadingGraph";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllMenuItems = async () => {
    try {
      const response = await axios.get("/api/menu-items");
      setMenuItems(response?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllMenuItems();
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen">
      <CreateMenuItemModal fetchAllMenuItems={fetchAllMenuItems} />
      {/* Show Menu Items Table conditionally :: */}
      {menuItems.length > 0 ? (
        <MenuItemDataTable
          data={menuItems}
          fetchAllMenuItems={fetchAllMenuItems}
        />
      ) : loading ? (
        <LoadingGraph />
      ) : (
        <p className="text-center font-mono text-3xl py-10">
          No Data Available.
        </p>
      )}

      {/* Data Table to Show all the Menu Items:: */}
    </div>
  );
};

export default MenuItems;
