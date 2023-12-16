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
import { daysBetweenDates, getSmallDate } from "@/app/utils/date";

const Planning = ({ hide }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortedCheckedItems, setSortedCheckedItems] = useState([]);
  const [recommendedItems, setRecommendedItems] = useState([]);

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
    setTags([newTag, ...tags]);
  };

  const deleteTag = (tagToDelete) => {
    //update db
    db.tags.delete(tagToDelete.id)

    let newTags = tags.filter((tag) => {
      return tag.id != tagToDelete.id
    })
    
    //update state
    setTags(newTags)
  }

  const itemsContext = useContext(ItemsContext);

  useEffect(() => {
    setSortedCheckedItems(
      itemsContext.items.slice().sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
    setRecommendedItems(
      itemsContext.items
        .filter((item) => {
          return (
            daysBetweenDates(getSmallDate(), item.lastChecked) >
            item.averageDuration
          );
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 2)
    );
  }, [itemsContext.items]);

  useEffect(() => {
    db.tags.toArray().then((data) => {
      setTags(data);
    });
  }, []);

  return (
    <div
      className={`planning ${isExpanded ? "max" : "min"} ${
        hide ? "hidePlanning" : ""
      }`}
    >
      <div className="styledSeparator">&nbsp;</div>
      <div className="planningMainContainer">
        <div className="iNeedContainer">
          <Image
            className="expandArrow"
            src={expandArrow}
            onClick={() => {
              setIsExpanded((previous) => {
                return !previous;
              });
            }}
            alt="expand menu"
          />
          <p className="iNeedLabel">I need</p>
          <div className="tagIconSearchSpacerContainer">
            <Image
              className="tagIcon"
              src={isTagView ? tagIcon : tagIconOff}
              onClick={() => {
                setIsTagView((previous) => {
                  return !previous;
                });
              }}
              alt="tag view"
            />
            <SearchBar />
          </div>
        </div>
        <div className="planningTagsListContainer">
          {isTagView ? 
          <><CreateTag
              createTag={(tag) => 
                createNewTag(tag)
              }
            />
            {tags.map((tag, index) => (
                <TagListItem
                  tag={tag}
                  key={index}
                  unCheckItem={(selectedItem) =>
                    itemsContext.checkUncheckItem(selectedItem, false)
                  }
                  deleteTag={(tag) => {
                    deleteTag(tag)
                  }}
                />
              ))}</>
           : (
            <>
              {recommendedItems.some((item) => item.checked) > 0 && (
                <p className="planningListTitle">Recommended</p>
              )}
              {recommendedItems.map((item, index) => (
                <PlanningListItem
                  item={item}
                  key={index}
                  isRecommendation={true}
                  unCheckItem={(selectedItem) =>
                    itemsContext.checkUncheckItem(selectedItem, false)
                  }
                />
              ))}
              <p className="planningListTitle">All</p>
              {sortedCheckedItems.map((item, index) => (
                <PlanningListItem
                  item={item}
                  key={index}
                  unCheckItem={(selectedItem) =>
                    itemsContext.checkUncheckItem(selectedItem, false)
                  }
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Planning;
