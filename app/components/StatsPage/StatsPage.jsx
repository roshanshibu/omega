import { ItemsContext } from "@/app/page";
import StatsItem from "../StatsItem/StatsItem";
import "./StatsPage.css";
import CalendarIcon from "@/assets/Calendar.svg";
import { useContext } from "react";

const StatsPage = () => {
  const itemsContext = useContext(ItemsContext);

  return (
    <div className="statsContainer">
      <div className="statsHeader">
        <p className="statHeaderLabel">Ready for the next grocery run?</p>
        <div className="statHeaderText">
          <p>Next run in</p>
          <div
            className="calendarIconContainer"
            style={{
              backgroundImage: `url(${CalendarIcon.src})`,
            }}
          >
            <p className="calendarText">4</p>
          </div>
          <p>days</p>
        </div>
      </div>

      {/* <StatsItem itemName={"milk"} /> */}
      {itemsContext.items.map((item) => {
        if (!item.checked) return <StatsItem item={item} key={item.id} />;
      })}
    </div>
  );
};

export default StatsPage;
