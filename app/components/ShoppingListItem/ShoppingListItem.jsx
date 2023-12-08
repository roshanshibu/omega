import "./ShoppingListItem.css";
import checked from "@/assets/checked.svg";
import unchecked from "@/assets/unchecked.svg";
import Image from "next/image";

const ShoppingListItem = ({ item, checkItem }) => {
  return (
    <div className="shoppingListItemContents">
      <Image
        draggable={false}
        src={item.checked ? checked : unchecked}
        alt="checkbox icon"
        className="checkbox"
        onClick={() => checkItem(item)}
      />
      {item.name}
    </div>
  );
};

export default ShoppingListItem;
