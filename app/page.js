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
  const [animateContainer, setAnimateContainer] = useState(true);

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

  const mountedStyle = {
    animation: "inAnimation 100ms ease-in",
  };
  const unmountedStyle = {
    animation: "outAnimation 50ms ease-out",
    animationFillMode: "forwards",
  };

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
          {animateContainer ? (
            <div
              style={isListMode ? mountedStyle : unmountedStyle}
              onAnimationEnd={() => {
                console.log("animation end");
                setAnimateContainer(isListMode);
              }}
            >
              <ShoppingList />
            </div>
          ) : (
            <div
              style={isListMode ? unmountedStyle : mountedStyle}
              onAnimationEnd={() => {
                console.log("animation end");
                setAnimateContainer(isListMode);
              }}
            >
              <StatsPage />
            </div>
          )}
        </div>
        <Planning hide={!isListMode} />
      </ItemsContext.Provider>
    </>
  );
}
