import "./SearchBar.css";
import { React, useEffect, useState } from "react";
import { useZxing } from "react-zxing";

const constraints = {
  video: true,
  audio: false,
};

const SearchBar = ({ onBarCodeScan }) => {
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
      setDeviceId[
        availableVideoDevices[availableVideoDevices.length - 2].deviceId
      ];
    });
  };

  useEffect(() => {
    getList();
  });

  const { ref } = useZxing({
    onDecodeResult(result) {
      onBarCodeScan(result.getText());
      console.log(result.getText());
    },
    deviceId,
  });

  return (
    <>
      <video ref={ref} className="viewfinder" />
      {/* <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p> */}
    </>
  );
};

export default SearchBar;
