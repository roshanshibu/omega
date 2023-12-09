"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import "./Planning.css";
import expandArrow from "@/assets/expand-arrow.svg";
import SearchBar from "../SearchBar/SearchBar";
import { ItemsContext } from "@/app/page";
import PlanningListItem from "../PlanningListItem/PlanningListItem";

const Planning = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempCode, setTempCode] = useState("-");

  const itemsContext = useContext(ItemsContext);

  const unCheckItem = (selectedItem) => {
    itemsContext.setItems((items) => {
      let newArray = items.map((item) => {
        return item.id === selectedItem.id ? { ...item, checked: false } : item;
      });
      return newArray;
    });
  };

  return (
    <div className={`planning ${isExpanded ? "max" : "min"}`}>
      <div className="styledSeparator">&nbsp;</div>
      <div className="planningMainContainer">
        <div className="iNeedContainer">
          <Image
            className="expandArrow flex-grow-1"
            src={expandArrow}
            onClick={() => {
              setIsExpanded((previous) => {
                return !previous;
              });
            }}
            alt="expand menu"
          />
          <p className="flex-grow-1">I need</p>
          <SearchBar onResult={setTempCode} />
        </div>
        <div className="planningListContainer">
          {itemsContext.items.map((item, index) => (
            <PlanningListItem
              item={item}
              key={index}
              unCheckItem={unCheckItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planning;
