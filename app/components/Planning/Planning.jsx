"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import "./Planning.css";
import expandArrow from "@/assets/expand-arrow.svg";
import tagIcon from "@/assets/tag-icon-on.svg";
import tagIconOff from "@/assets/tag-icon-off.svg";
import SearchBar from "../SearchBar/SearchBar";
import { ItemsContext } from "@/app/page";
import PlanningListItem from "../PlanningListItem/PlanningListItem";
import TagListItem from "../TagListItem/TagListItem";
import CreateTag from "../CreateTag/CreateTag";
import { db } from "@/app/utils/db";

const Planning = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempCode, setTempCode] = useState("-");
  const [sortedCheckedItems, setSortedCheckedItems] = useState([]);

  // Tags
  const [isTagView, setIsTagView] = useState(false);
  const [tags, setTags] = useState([]);

  const createNewTag = async (tag) => {
    let newTag = { ...tag, id: crypto.randomUUID() };
    // update db
    const id = await db.tags.add({
      ...newTag,
    });
    //update state
    setTags([...tags, newTag]);
  };

  const itemsContext = useContext(ItemsContext);

  useEffect(() => {
    setSortedCheckedItems(
      itemsContext.items.slice().sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
  }, [itemsContext.items]);

  useEffect(() => {
    db.tags.toArray().then((data) => {
      setTags(data);
    });
  }, []);

  //TODO: remove from production
  const createAllItemsTag = () => {
    if (!tags.map((t) => t.name).includes("All")) {
      let allItemsTag = {
        name: "All",
        itemIds: itemsContext.items.map((item) => item.id),
      };
      createNewTag(allItemsTag);
    }
  };
  //-----------------------------------------------------

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
            className="tagIcon"
            src={isTagView ? tagIcon : tagIconOff}
            onClick={() => {
              createAllItemsTag();
              setIsTagView((previous) => {
                return !previous;
              });
            }}
            alt="tag view"
          />
          <SearchBar onResult={setTempCode} />
        </div>
        <div className="planningTagsListContainer">
          {isTagView
            ? 
            <><CreateTag/>
            {tags.map((tag, index) => (
                <TagListItem
                  tag={tag}
                  key={index}
                  unCheckItem={(selectedItem) =>
                    itemsContext.checkUncheckItem(selectedItem, false)
                  }
                />
              ))}</>
            : sortedCheckedItems.map((item, index) => (
                <PlanningListItem
                  item={item}
                  key={index}
                  unCheckItem={(selectedItem) =>
                    itemsContext.checkUncheckItem(selectedItem, false)
                  }
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Planning;
