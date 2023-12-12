import "./ModeSlider.css";

const ModeSlider = ({ isListMode, setIsListMode }) => {
  return (
    <div className="moodSliderParent">
      <div className="modeSlider">
        <div className={`slider ${isListMode ? "" : "sRight"}`}></div>
        <p
          className={!isListMode && "allowClick"}
          onClick={() => {
            setIsListMode(true);
          }}
        >
          List
        </p>
        <p
          className={isListMode && "allowClick"}
          onClick={() => {
            setIsListMode(false);
          }}
        >
          Plan
        </p>
      </div>
    </div>
  );
};

export default ModeSlider;
