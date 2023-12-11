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
    <div className={"tagListItemContainer " + (tag.checked ? "" : "hide")}>
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
        {itemsContext.items.map(
          (item, index) =>
            tag.itemIds.includes(item.id) && <li key={index}>{item.name}</li>
        )}

        {/* <li>Chicken</li>
                <li>butter</li>
                <li>Corriander</li>
                <li>Chilli</li>
                <li>salt</li>
                <li>tomatoes</li>
                <li>Chicken</li>
                <p>...</p>
                 */}
      </div>
    </div>
  );
};

export default TagListItem;
