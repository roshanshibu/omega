"use client";
import React, { createContext, useState } from "react";
import Planning from "./components/Planning/Planning";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import "./page.css";

export const ItemsContext = createContext();

export default function Home() {
  const [items, setItems] = useState([
    { id: 1, name: "Milk", quantity: 2, quantityName: "x", checked: false },
    {
      id: 2,
      name: "Rice",
      quantity: 5,
      quantityName: "kg",
      checked: true,
    },
    { id: 3, name: "Cereal", quantity: 1, quantityName: "x", checked: false },
  ]);
  const [tags, setTags] = useState([
    { id: 1, name: "Breakfast", itemIds: [1,3], checked: true },
    { id: 2, name: "Dinner", itemIds: [2], checked: true },
  ]);
  return (
    <>
      <ItemsContext.Provider value={{ items, setItems, tags, setTags }}>
        <div className="content">
          <ShoppingList />
        </div>
        <Planning />
      </ItemsContext.Provider>
    </>
  );
}
