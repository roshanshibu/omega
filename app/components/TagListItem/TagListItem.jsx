import { useContext } from "react";

import "./TagListItem.css";
import checked from "@/assets/checked.svg";
import Image from "next/image";

import { ItemsContext } from "@/app/page";

const TagListItem = ({ tag, unCheckItem }) => {
  const itemsContext = useContext(ItemsContext);

  const unCheckTagItems = (tag) => {
    itemsContext.items.map((item) => {
      if (tag.itemIds.includes(item.id)) {
        unCheckItem(item);
      }
    });
  };

  return (
    <div className="tagListItemContainer">
      <div className="tagItemHeader">
        <Image
          draggable={false}
          src={checked}
          alt="checkbox icon"
          className="checkbox"
          onClick={() => {
            unCheckTagItems(tag);
          }}
        />
        <p>{tag.name}</p>
      </div>
      <div className="tagItems">
        {tag.itemIds.map((id, index) =>
          index < 7 ? (
            <li key={index}>
              {itemsContext.items.find((item) => item.id == id).name}
            </li>
          ) : (
            index === 7 && <p>...</p>
          )
        )}
      </div>
    </div>
  );
};

export default TagListItem;
