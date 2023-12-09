"use client";
import React, { createContext, useEffect, useState } from "react";
import Planning from "./components/Planning/Planning";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import "./page.css";
import DB from "./utils/db";

export const ItemsContext = createContext();

export default function Home() {
  const [items, setItems] = useState([]);
  const [getLatestDBItems, setGetLatestDBItems] = useState(1);
  let db = new DB("omega");
  useEffect(() => {
    console.log("fetching new data from db...");
    db.getAllItems().then((data) => {
      setItems(data);
    });
  }, [getLatestDBItems]);

  return (
    <>
      <ItemsContext.Provider value={{ items, setItems, setGetLatestDBItems }}>
        <div className="content">
          <ShoppingList />
        </div>
        <Planning />
      </ItemsContext.Provider>
    </>
  );
}
