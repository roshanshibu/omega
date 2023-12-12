"use client";
import React, { createContext, useEffect, useState } from "react";
import Planning from "./components/Planning/Planning";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import "./page.css";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./utils/db";
import ModeSlider from "./components/ModeSlider/ModeSlider";
import StatsPage from "./components/StatsPage/StatsPage";

export const ItemsContext = createContext();

export default function Home() {
  const [items, setItems] = useState([]);
  const [isListMode, setIsListMode] = useState(true);

  const createNewItem = async (itemName) => {
    let newItem = {
      id: crypto.randomUUID(),
      name: itemName,
      quantity: 1,
      quantityName: "x",
      checked: false,
    };
    // update db
    const id = await db.items.add({
      ...newItem,
    });
    //update state
    setItems([...items, newItem]);
  };

  const checkUncheckItem = (selectedItem, isChecked) => {
    //update db
    db.items.update(selectedItem.id, { checked: isChecked }).then(() => {
      //update state
      setItems((items) => {
        let newArray = items.map((item) => {
          return item.id === selectedItem.id
            ? { ...item, checked: isChecked }
            : item;
        });
        return newArray;
      });
    });
  };

  useEffect(() => {
    db.items.toArray().then((data) => {
      setItems(data);
    });
  }, []);

  return (
    <>
      <ItemsContext.Provider
        value={{
          items,
          setItems,
          createNewItem,
          checkUncheckItem,
        }}
      >
        <div className="content">
          <ModeSlider isListMode={isListMode} setIsListMode={setIsListMode} />
          <ShoppingList />
          {/* <StatsPage /> */}
        </div>
        <Planning />
      </ItemsContext.Provider>
    </>
  );
}
