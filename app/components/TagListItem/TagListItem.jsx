import { useState, useContext } from "react";

import "./TagListItem.css";
import checked from "@/assets/checked.svg";
import deleteIcon from "@/assets/delete-icon.svg";
import Image from "next/image";

import { ItemsContext } from "@/app/page";

const TagListItem = ({ tag, unCheckItem, deleteTag }) => {
  const itemsContext = useContext(ItemsContext);

  const [isTagExpanded, setIsTagExpanded] = useState(false);

  const unCheckTagItems = (tag) => {
    itemsContext.items.map((item) => {
      if (tag.itemIds.includes(item.id)) {
        unCheckItem(item);
      }
    });
  };

  return (
    <div className="tagListItemContainer">
      <div 
        className="tagItemHeader"
        onClick={() => {
          unCheckTagItems(tag);
        }}
      >
        <Image
          draggable={false}
          src={checked}
          alt="checkbox icon"
          className="checkbox"
        />
        <p>{tag.name}</p>
        {/* {
          isTagExpanded &&
          <Image
            draggable={false}
            src={deleteIcon}
            alt="delete icon"
            className="deleteIcon"
          />
        } */}
      </div>
      <div 
        className="tagItems"
        onClick={() => {
            setIsTagExpanded((previous) => {
            return !previous;
            });
        }}
      >
        {isTagExpanded ? (
          tag.itemIds.map((id, index) =>
            <li key={index}>
              {itemsContext.items.find((item) => item.id == id).name}
            </li>
          )
          
        ):(
          tag.itemIds.map((id, index) =>
            index < 7 ? (
              <li key={index}>
                {itemsContext.items.find((item) => item.id == id).name}
              </li>
            ) : (
              index === 7 && <p>...</p>
            )
          )
        ) 
        }
      </div>
      {isTagExpanded &&
        <div 
          className="deleteTagContainer"
          onClick={()=> deleteTag(tag)}
        >
          <Image
              draggable={false}
              src={deleteIcon}
              alt="delete icon"
              className="deleteIcon"
            />
            Delete Tag
        </div>
      }
    </div>
  );
};

export default TagListItem;
