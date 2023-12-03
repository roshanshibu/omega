"use client";

import { useState } from "react";
import Image from "next/image";

import "./Planning.css";
import expandArrow from "@/assets/expand-arrow.svg";

const Planning = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div class={`planning ${isExpanded ? "max" : "min"}`}>
      <div class="styledSeparator">&nbsp;</div>
      <div className="planningMainContainer">
        <div class="iNeedContainer">
          <Image
            className="expandArrow"
            src={expandArrow}
            onClick={() => {
              setIsExpanded((previous) => {
                return !previous;
              });
            }}
          />
          <p>I need</p>
        </div>
      </div>
    </div>
  );
};

export default Planning;
