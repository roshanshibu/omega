import "./PlanningListItem.css";
import checked from "@/assets/checked.svg";
import unchecked from "@/assets/unchecked.svg";
import Image from "next/image";

const PlanningListItem = ({ item, unCheckItem }) => {
  return (
    <div
      className={"planningListItemContainer " + (item.checked ? "" : "hide")}
    >
      <Image
        draggable={false}
        src={checked}
        alt="checkbox icon"
        className="checkbox"
        onClick={() => {
          unCheckItem(item);
        }}
      />
      <p>{item.name}</p>
      <div className="lastBoughtStatContainer">
        <p>last bought</p>
        <p>2 weeks ago</p>
      </div>
    </div>
  );
};

export default PlanningListItem;
