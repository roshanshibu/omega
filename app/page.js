"use client";
import React, { createContext, useEffect, useState } from "react";
import Planning from "./components/Planning/Planning";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import "./page.css";
import { useLiveQuery } from "dexie-react-hooks";
import { addBarCodeData, db } from "./utils/db";
import ModeSlider from "./components/ModeSlider/ModeSlider";
import StatsPage from "./components/StatsPage/StatsPage";
import { daysBetweenDates, getSmallDate, isUnderThreshold } from "./utils/date";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import emptyBasket from "@/assets/empty-basket.png";
import qrCode from "@/assets/QRCode.svg";

export const ItemsContext = createContext();

export default function Home() {
  const [items, setItems] = useState([]);
  const [isListMode, setIsListMode] = useState(true);
  const [animateContainer, setAnimateContainer] = useState(true);

  const queryClient = new QueryClient();

  const createNewItem = async (itemName) => {
    let newItem = {
      id: crypto.randomUUID(),
      name: itemName,
      quantity: 1,
      quantityName: "x",
      checked: false,
      lastChecked: 0,
      lastUnchecked: 0,
      averageDuration: 0,
      count: 0,
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
    let oldAverage = selectedItem.averageDuration;
    let oldCount = selectedItem.count;
    let newAverage = oldAverage;
    let newCount = oldCount;

    // In order to avoid updating lastChecked date when the user accidentally toggles an item...
    // If the user has checked an item, look at it's last unchecked time
    if (isChecked) {
      let itemLastUnchecked = selectedItem.lastUnchecked;
      // if the same item was unchecked less than 2 minutes ago ...
      if (isUnderThreshold(itemLastUnchecked, Date.now(), 2)) {
        // ... do not update lastChecked time
        newTimestamp = selectedItem.lastChecked;
        // console.log("possible accidental toggle, not updating lastChecked");
      }
      // if this is a new item, which will not have a last checked time, ignore it
      // otherwise, we can update the averageDuration value
      else if (selectedItem.lastChecked !== 0) {
        let newDuration = daysBetweenDates(
          getSmallDate(),
          selectedItem.lastChecked
        );
        newCount = oldCount + 1;
        newAverage = (oldAverage * oldCount + newDuration) / newCount;
      }
    }

    //update db
    db.items
      .update(selectedItem.id, { checked: isChecked })
      .then(() => {
        if (isChecked)
          db.items.update(selectedItem.id, {
            lastChecked: newTimestamp,
            averageDuration: newAverage,
            count: newCount,
          });
        else db.items.update(selectedItem.id, { lastUnchecked: newTimestamp });
      })
      .then(() => {
        //update state
        setItems((items) => {
          let newArray = items.map((item) => {
            return item.id === selectedItem.id
              ? isChecked
                ? {
                    ...item,
                    checked: isChecked,
                    lastChecked: newTimestamp,
                    averageDuration: newAverage,
                    count: newCount,
                  }
                : { ...item, checked: isChecked, lastUnchecked: newTimestamp }
              : item;
          });
          return newArray;
        });
      });
  };

  const forceDbSync = (syncItem) => {
    // update every property in db for the provided syncItem to match exactly with the global state
    // its better to list out properties explicitly
    db.items.update(syncItem.id, {
      name: syncItem.name,
      quantity: syncItem.quantity,
      quantityName: syncItem.quantityName,
      checked: syncItem.checked,
      lastChecked: syncItem.lastChecked,
      lastUnchecked: syncItem.lastUnchecked,
      averageDuration: syncItem.averageDuration,
      count: syncItem.count,
    });
  };

  useEffect(() => {
    addBarCodeData();

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
      <QueryClientProvider client={queryClient}>
        <ItemsContext.Provider
          value={{
            items,
            setItems,
            createNewItem,
            checkUncheckItem,
            forceDbSync,
          }}
        >
          <div className="content">
            <ModeSlider isListMode={isListMode} setIsListMode={setIsListMode} />
            {animateContainer ? (
              <div
                style={isListMode ? mountedStyle : unmountedStyle}
                onAnimationEnd={() => {
                  setAnimateContainer(isListMode);
                }}
              >
                {items.filter((i) => !i.checked).length === 0 ? (
                  <div className="emptyContainer">
                    <Image
                      draggable={false}
                      src={emptyBasket}
                      alt="empty shopping list"
                      className="emptyShoppingBasketImage"
                      width={200}
                    />
                    <p>Your shopping list is empty</p>
                  </div>
                ) : (
                  <ShoppingList />
                )}
              </div>
            ) : (
              <div
                style={isListMode ? unmountedStyle : mountedStyle}
                onAnimationEnd={() => {
                  setAnimateContainer(isListMode);
                }}
              >
                <StatsPage />
              </div>
            )}
          </div>
          <Planning hide={!isListMode} />
          <div className="desktopInfo">
            <p>Lizt works best on mobile.</p>
            <Image
              draggable={false}
              src={qrCode}
              alt="qr code"
              className="qrcode"
              width={200}
            />
            <p>Scan the QR Code on your mobile device.</p>
          </div>
        </ItemsContext.Provider>
      </QueryClientProvider>
    </>
  );
}
