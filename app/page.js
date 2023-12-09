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
      name: "RiceRiceRiceRice RiceRiceRiceRice RiceRice",
      quantity: 5,
      quantityName: "kg",
      checked: true,
    },
    { id: 3, name: "Cereal", quantity: 1, quantityName: "x", checked: false },
  ]);
  return (
    <>
      <ItemsContext.Provider value={{ items, setItems }}>
        <div className="content">
          <ShoppingList />
        </div>
        <Planning />
      </ItemsContext.Provider>
    </>
  );
}
