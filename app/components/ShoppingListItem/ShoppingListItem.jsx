import "./ShoppingListItem.css";
import checked from "@/assets/checked.svg";
import unchecked from "@/assets/unchecked.svg";
import minusIcon from "@/assets/minus.svg";
import plusIcon from "@/assets/plus.svg";
import Image from "next/image";

const ShoppingListItem = ({
  item,
  checkItem,
  showQtyControl,
  getQtyControl,
  increaseQty,
  decreaseQty,
}) => {
  return (
    <div className="shoppingListItemContents">
      <div className="checkListNameContainer" onClick={() => checkItem(item)}>
        <Image
          draggable={false}
          src={item.checked ? checked : unchecked}
          alt="checkbox icon"
          className="checkbox"
        />
        <p className="itemName">{item.name}</p>
      </div>
      <div className="quantityControlParent">
        <div
          className="quantityControlContainer"
          onClick={() => {
            getQtyControl(item.id);
          }}
        >
          {showQtyControl && (
            <Image
              draggable={false}
              src={minusIcon}
              alt="reduce Quantity"
              className="quantityControlIcon"
              onClick={() => {
                decreaseQty(item);
              }}
            />
          )}
          <span className={showQtyControl ? "" : "extraPadding"}>
            {item.quantity}
            {item.quantityName}
          </span>
          {showQtyControl && (
            <Image
              draggable={false}
              src={plusIcon}
              alt="reduce Quantity"
              className="quantityControlIcon"
              onClick={() => {
                increaseQty(item);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListItem;
