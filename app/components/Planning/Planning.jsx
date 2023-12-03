import "./Planning.css";

const Planning = ({ isExpanded }) => {
  return (
    <div class={`planning ${isExpanded ? "max" : ""}`}>
      <div class="styledSeparator">&nbsp;</div>
      <div className="planningMainContainer">
        <div class="iNeedContainer">
          <p>I need ____</p>
        </div>
      </div>
    </div>
  );
};

export default Planning;
