"use client";
import React, { createContext, useEffect, useState } from "react";
import Planning from "./components/Planning/Planning";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import "./page.css";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./utils/db";

export const ItemsContext = createContext();

export default function Home() {
  const [items, setItems] = useState([]);

  const unCheckItem = (selectedItem) => {
    setItems((items) => {
      let newArray = items.map((item) => {
        return item.id === selectedItem.id ? { ...item, checked: false } : item;
      });
      return newArray;
    });
  };

  useEffect(() => {
    db.items.toArray().then((data) => {
      setItems(data);
    });
  }, []);

  return (
    <>
      <ItemsContext.Provider value={{ items, setItems, unCheckItem }}>
        <div className="content">
          <ShoppingList />
        </div>
        <Planning />
      </ItemsContext.Provider>
    </>
  );
}
