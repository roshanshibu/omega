"use client";
import React, { createContext, useEffect, useState } from "react";
import Planning from "./components/Planning/Planning";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import "./page.css";
import { useLiveQuery } from "dexie-react-hooks";
import { addCleanDemoData, db } from "./utils/db";
import ModeSlider from "./components/ModeSlider/ModeSlider";
import StatsPage from "./components/StatsPage/StatsPage";
import { getSmallDate, isUnderThreshold } from "./utils/date";

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
      lastChecked: 0,
      lastUnchecked: 0,
    };
    // update db
    const id = await db.items.add({
      ...newItem,
    });
    //update state
    setItems([...items, newItem]);
  };

  const checkUncheckItem = (selectedItem, isChecked) => {
    // lastChecked is stored as a short date
    // lastUnchecked is stored as unix timestamp - we need date & time
    let newTimestamp = isChecked ? getSmallDate() : Date.now();

    // In order to avoid updating lastChecked date when the user accidentally toggles an item...
    // If the user has checked an item, look at it's last unchecked time
    if (isChecked) {
      let itemLastUnchecked = selectedItem.lastUnchecked;
      // if the same item was unchecked less than 2 minutes ago ...
      if (isUnderThreshold(itemLastUnchecked, Date.now(), 2)) {
        // ... do not update lastChecked time
        newTimestamp = selectedItem.lastChecked;
        console.log("possible accidental toggle, not updating lastChecked");
      }
    }

    //update db
    db.items
      .update(selectedItem.id, { checked: isChecked })
      .then(() => {
        if (isChecked)
          db.items.update(selectedItem.id, { lastChecked: newTimestamp });
        else db.items.update(selectedItem.id, { lastUnchecked: newTimestamp });
      })
      .then(() => {
        //update state
        setItems((items) => {
          let newArray = items.map((item) => {
            return item.id === selectedItem.id
              ? isChecked
                ? { ...item, checked: isChecked, lastChecked: newTimestamp }
                : { ...item, checked: isChecked, lastUnchecked: newTimestamp }
              : item;
          });
          return newArray;
        });
      });
  };

  useEffect(() => {
    // remove in prod, for demo only
    // keep this call only in a demo branch with its own preview deployment
    addCleanDemoData();

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
