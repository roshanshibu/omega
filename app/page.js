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

  useEffect(() => {
    db.items.toArray().then((data) => {
      console.log(data);
      setItems(data);
    });
  }, []);

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
