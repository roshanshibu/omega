import { useContext } from "react";

import "./TagListItem.css";
import checked from "@/assets/checked.svg";
import Image from "next/image";

import { ItemsContext } from "@/app/page";

const TagListItem = ({ tag, unCheckItem }) => {

    const itemsContext = useContext(ItemsContext);

  return (
    <div className={"tagListItemContainer " + (tag.checked ? "" : "hide")}>
        <div className="tagItemHeader">
            <Image
                draggable={false}
                src={checked}
                alt="checkbox icon"
                className="checkbox"
                onClick={() => {
                //   unCheckItem(item);
                }}
            />
            <p>{tag.name}</p>
        </div>
        <div className="tagItems">
            {itemsContext.items.map((item,index) => (
                tag.itemIds.includes(item.id) && <li>{item.name}</li>
            ))}
        
            {/* <li>Chicken 1kg</li>
            <li>Chicken 1kg</li>
            <li>Chicken 1kg</li>
            <li>Chicken 1kg</li>
            <li>Chicken 1kg</li>
            <li>Chicken 1kg</li>
            <li>Chicken 1kg</li>
            <li>Chicken 1kg</li>
            <li>Chicken 1kg</li>
            <li>Chicken 1kg</li> */}
        
        </div>
    </div>
  );
};

export default TagListItem;
