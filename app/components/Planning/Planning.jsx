"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import "./Planning.css";
import expandArrow from "@/assets/expand-arrow.svg";
import SearchBar from "../SearchBar/SearchBar";

const Planning = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempCode, setTempCode] = useState("-");
  const [deviceId, setDeviceId] = useState(null);
  const getList = () => {
    navigator.mediaDevices.enumerateDevices().then((data) => {
      console.log(data);
      const availableVideoDevices = data.filter(
        (device) => device.kind === "videoinput"
      );
      console.log(availableVideoDevices);
      let dataString = "";
      availableVideoDevices.map((d) => {
        dataString += `ID: ${d.deviceId} - ${d.label} | `;
      });
      alert(
        `video device array length :${availableVideoDevices.length} ++ ${dataString}`
      );
      setDeviceId(
        availableVideoDevices[availableVideoDevices.length - 1].deviceId
      );
    });
  };
  useEffect(() => {
    getList();
  });

  return (
    <div className={`planning ${isExpanded ? "max" : "min"}`}>
      <div className="styledSeparator">&nbsp;</div>
      <div className="planningMainContainer">
        <div className="iNeedContainer">
          <p>{tempCode}</p>
          <SearchBar
            onBarCodeScan={setTempCode}
            deviceId={
              "b06962d39aa4b2adce893c57213acf36332f810306956baec07a41dc397d402c"
            }
          />
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
