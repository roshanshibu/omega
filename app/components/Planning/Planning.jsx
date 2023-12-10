"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import "./Planning.css";
import expandArrow from "@/assets/expand-arrow.svg";
import tagIcon from "@/assets/tag-icon.svg";
import SearchBar from "../SearchBar/SearchBar";
import { ItemsContext } from "@/app/page";
import PlanningListItem from "../PlanningListItem/PlanningListItem";
import TagListItem from "../TagListItem/TagListItem";

const Planning = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempCode, setTempCode] = useState("-");
  const [isTagView, setIsTagView] = useState(false);

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
          <Image
            className="tagIcon flex-grow-1"
            src={tagIcon}
            onClick={() => {
              setIsTagView((previous) => {
                return !previous;
              });
            }}
            alt="tag view"
          />
          <SearchBar onResult={setTempCode} />
        </div>
        <div className="planningListContainer">
          {itemsContext.items.map((item, index) => (
            !isTagView && 
              <PlanningListItem
                item={item}
                key={index}
                unCheckItem={unCheckItem}
              />
          ))}
        </div>
        <div className="tagListContainer">
        {itemsContext.tags.map((tag, index) => (
            isTagView && 
              <TagListItem
                tag={tag}
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
