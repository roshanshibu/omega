"use client";

import { useState } from "react";
import Image from "next/image";

import "./Planning.css";
import expandArrow from "@/assets/expand-arrow.svg";
import SearchBar from "../SearchBar/SearchBar";

const Planning = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempCode, setTempCode] = useState("-");

  return (
    <div className={`planning ${isExpanded ? "max" : "min"}`}>
      <div className="styledSeparator">&nbsp;</div>
      <div className="planningMainContainer">
        <div className="iNeedContainer">
          <p>{tempCode}</p>
          <SearchBar onBarCodeScan={setTempCode} />
          <Image
            className="expandArrow"
            src={expandArrow}
            onClick={() => {
              setIsExpanded((previous) => {
                return !previous;
              });
            }}
            alt="expand menu"
          />
          <p>I need</p>
        </div>
      </div>
    </div>
  );
};

export default Planning;