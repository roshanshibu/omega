import "./StatsPage.css";
import CalendarIcon from "@/assets/Calendar.svg";

const StatsPage = () => {
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
    </div>
  );
};

export default StatsPage;
