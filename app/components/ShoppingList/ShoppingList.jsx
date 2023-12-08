"use client";
import React, { useContext, useState } from "react";
import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import { ItemsContext } from "@/app/page";
import Image from "next/image";
import dragIcon from "@/assets/dragIcon.svg";
import ShoppingListItem from "../ShoppingListItem/ShoppingListItem";

import "./ShoppingList.css";

const ShoppingList = () => {
  const itemsContext = useContext(ItemsContext);

  const onSortEnd = (oldIndex, newIndex) => {
    itemsContext.setItems((items) =>
      arrayMoveImmutable(items, oldIndex, newIndex)
    );
  };

  const checkItem = (selectedItem) => {
    console.log("here");
    itemsContext.setItems((items) => {
      let newArray = items.map((item) => {
        return item.id === selectedItem.id ? { ...item, checked: true } : item;
      });
      return newArray;
    });
  };
  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="shoppingListContainer"
      draggedItemClassName="dragged"
    >
      {itemsContext.items.map((item, index) => (
        <SortableItem key={index}>
          <div className="shoppingListItemContainer">
            <ShoppingListItem item={item} checkItem={checkItem} />
            <SortableKnob>
              <Image
                draggable={false}
                src={dragIcon}
                alt="reorder icon"
                className="dragIcon"
              />
            </SortableKnob>
          </div>
        </SortableItem>
      ))}
    </SortableList>
  );
};

export default ShoppingList;
