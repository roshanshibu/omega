import "./PlanningListItem.css";
import checked from "@/assets/checked.svg";
import unchecked from "@/assets/unchecked.svg";
import Image from "next/image";

const PlanningListItem = ({ item, unCheckItem }) => {
  return (
    <div
      className={"planningListItemContainer " + (item.checked ? "" : "hide")}
    >
      <span
        onClick={() => {
          unCheckItem(item);
        }}
      >
        <Image
          draggable={false}
          src={checked}
          alt="checkbox icon"
          className="checkbox"
        />
        <p>{item.name}</p>
      </span>
      <div className="lastBoughtStatContainer">
        <p>last bought</p>
        <p>2 weeks ago</p>
      </div>
    </div>
  );
};

export default PlanningListItem;
