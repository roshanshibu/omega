import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./BarCodeScanner.css";

const brConfig = { fps: 10 };
let html5QrCode;

const BarCodeScanner = (props) => {
  const fileRef = useRef(null);
  const [cameraList, setCameraList] = useState([]);
  const [activeCamera, setActiveCamera] = useState();
  const [isCameraOn, setIsCameraOn] = useState(false);
  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
    getCameras();
    const oldRegion = document.getElementById("qr-shaded-region");
    oldRegion && oldRegion.remove();
  }, []);

  const toggleCameraOn = () => {
    if (isCameraOn) stopCamera();
    else startCamera();
    setIsCameraOn((isCameraOnNow) => !isCameraOnNow);
  };

  const startCamera = () => {
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      console.info(decodedResult, decodedText);
      props.onResult(decodedText);
      console.log(`decoded:__ ${decodedText}`);
      stopCamera();
    };
    html5QrCode
      .start({ facingMode: "environment" }, brConfig, qrCodeSuccessCallback)
      .then(() => {
        // const oldRegion = document.getElementById("qr-shaded-region");
        // if (oldRegion) oldRegion.innerHTML = "";
      });
  };
  const getCameras = () => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        console.info(devices);
        if (devices && devices.length) {
          setCameraList(devices);
          setActiveCamera(devices[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        setCameraList([]);
      });
  };
  const onCameraChange = (e) => {
    if (e.target.selectedIndex) {
      let selectedCamera = e.target.options[e.target.selectedIndex];
      console.info(selectedCamera);
      let cameraId = selectedCamera.dataset.key;
      setActiveCamera(cameraList.find((cam) => cam.id === cameraId));
    }
  };
  const stopCamera = () => {
    try {
      html5QrCode
        .stop()
        .then((res) => {
          html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const scanLocalFile = () => {
    fileRef.current.click();
  };
  const scanFile = (e) => {
    if (e.target.files.length === 0) {
      // No file selected, ignore
      return;
    }

    // Use the first item in the list
    const imageFile = e.target.files[0];
    console.info(imageFile);
    html5QrCode
      .scanFile(imageFile, /* showImage= */ true)
      .then((qrCodeMessage) => {
        // success, use qrCodeMessage
        console.log(qrCodeMessage);
        props.onResult(qrCodeMessage);
        html5QrCode.clear();
      })
      .catch((err) => {
        // failure, handle it.
        console.log(`Error scanning file. Reason: ${err}`);
      });
  };

  return (
    <div className="bcs-parent">
      <button onClick={() => toggleCameraOn()}>toggle cam</button>

      <div id="reader"></div>
      {/* <button onClick={getCameras}>Get List of cameras</button>
      {cameraList.length > 0 && (
        <select onChange={onCameraChange}>
          {cameraList.map((li) => (
            <option
              key={li.id}
              id={li.id}
              selected={activeCamera && activeCamera.id === li.id}
            >
              {li.label}
            </option>
          ))}
          <option>Dummy</option>
        </select>
      )} */}
      {/* <button onClick={() => startCamera()}>start cam</button>
      <button onClick={() => stopCamera()}>stop cam</button> */}
      {/* <button onClick={scanLocalFile}>Scan local file</button>
      <input
        type="file"
        hidden
        ref={fileRef}
        accept="image/*"
        onChange={scanFile}
      /> */}
    </div>
  );
};

export default BarCodeScanner;
