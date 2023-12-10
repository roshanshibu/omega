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
  const [showQtyControlItem, setShowQtyControlItem] = useState(1);
  const itemsContext = useContext(ItemsContext);

  const onSortEnd = (oldIndex, newIndex) => {
    itemsContext.setItems((items) =>
      arrayMoveImmutable(items, oldIndex, newIndex)
    );
  };

  const increaseQty = (increaseItem) => {
    itemsContext.setItems((items) => {
      let newArray = items.map((item) => {
        return item.id === increaseItem.id
          ? { ...item, quantity: ++increaseItem.quantity }
          : item;
      });
      return newArray;
    });
  };

  const decreaseQty = (decreaseItem) => {
    itemsContext.setItems((items) => {
      let newArray = items.map((item) => {
        return item.id === decreaseItem.id
          ? {
              ...item,
              quantity:
                decreaseItem.quantity > 1
                  ? --decreaseItem.quantity
                  : decreaseItem.quantity,
            }
          : item;
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
          <div
            className={
              "shoppingListItemContainer " +
              (item.checked ? "shoppingHide" : "")
            }
          >
            <ShoppingListItem
              item={item}
              checkItem={(selectedItem) =>
                itemsContext.checkUncheckItem(selectedItem, true)
              }
              showQtyControl={showQtyControlItem === item.id}
              getQtyControl={setShowQtyControlItem}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />
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
