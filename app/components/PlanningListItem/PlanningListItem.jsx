import { humanizeTimeDuration } from "@/app/utils/date";
import "./PlanningListItem.css";
import checked from "@/assets/checked.svg";
import unchecked from "@/assets/unchecked.svg";
import Image from "next/image";

const PlanningListItem = ({ item, unCheckItem, isRecommendation }) => {
  return (
    <div
      className={
        "planningListItemContainer " +
        (item.checked ? "" : "hide") +
        (isRecommendation ? " reduceAnimations" : "")
      }
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
        <p className="lastBoughtLabel">last bought</p>
        <p className="lastBoughtInfoText">
          {humanizeTimeDuration(item.lastChecked)}
        </p>
      </div>
    </div>
  );
};

export default PlanningListItem;
