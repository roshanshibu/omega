import React, { useEffect, useState, useRef, useContext } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Image from "next/image";

import "./SearchBar.css";
import barCodeIcon from "@/assets/barcode_icon.svg";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import { ItemsContext } from "@/app/page";
import { db } from "@/app/utils/db";

const brConfig = { fps: 10 };
let html5QrCode;

const SearchBar = () => {
  const [cameraList, setCameraList] = useState([]);
  const [activeCamera, setActiveCamera] = useState();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [barCodes, setBarCodes] = useState([]);

  const itemsContext = useContext(ItemsContext);
  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
    getCameras();
    const oldRegion = document.getElementById("qr-shaded-region");
    oldRegion && oldRegion.remove();

    db.barCodes.toArray().then((data) => {
      setBarCodes(data);
    });
  }, []);

  const toggleCameraOn = () => {
    if (isCameraOn) stopCamera();
    else startCamera();
  };

  const checkItemByName = (itemName) => {
    // itemsContext.checkUncheckItem(item, false);
    itemsContext.items.forEach((item) => {
      if (item.name.toLowerCase() === itemName) {
        checkItem(item);
      }
    });
    setSearchText("");
  };

  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    setSearchText(decodedText);
    let barCodeMatchItem = "";
    barCodes.forEach((item) => {
      if (item.codes.includes(parseInt(decodedText))) {
        barCodeMatchItem = item.name;
      }
    });
    if (barCodeMatchItem !== "") {
      checkItemByName(barCodeMatchItem);
    }
  };

  const startCamera = () => {
    setIsCameraOn(true);
    html5QrCode.start(activeCamera.id, brConfig, qrCodeSuccessCallback);
  };

  const stopCamera = () => {
    setIsCameraOn(false);
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

  const getCameras = () => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
          setCameraList(devices);
          setActiveCamera(devices[0]);
          //for prototyping, remove from production
          if (devices.length == 4) setActiveCamera(devices[3]);
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

  const createItem = (itemName) => {
    itemsContext.createNewItem(itemName);
    setShowSuggestions(false);
    setSearchText("");
  };

  const checkItem = (item) => {
    itemsContext.checkUncheckItem(item, false);
    setSearchText("");
  };

  return (
    <div
      className="bcs-parent"
      tabIndex={-1}
      onBlur={() => setShowSuggestions(false)}
      onFocus={() => setShowSuggestions(searchText.length > 1)}
    >
      {showSuggestions && (
        <div className="searchSuggestionsParent">
          <SearchSuggestions
            searchText={searchText}
            createItem={createItem}
            checkItem={checkItem}
          />
        </div>
      )}
      <input
        id="searchTextInput"
        className={isCameraOn ? "hidden" : ""}
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setShowSuggestions(e.target.value.length > 1);
        }}
      />
      <div id="reader" className={isCameraOn ? "" : "hidden"}></div>
      <Image
        id="toggleButton"
        src={barCodeIcon}
        onClick={() => toggleCameraOn()}
        alt="barcode icon"
      />

      {/* <button onClick={getCameras}>Get List of cameras</button>
      {cameraList.length > 0 && (
        <select onChange={onCameraChange}>
          {cameraList.map((li) => (
            <option
              key={li.id}
              id={li.id}
              defaultValue={activeCamera && activeCamera.id === li.id}
            >
              {li.label}
            </option>
          ))}
          <option>Dummy</option>
        </select>
      )} */}
    </div>
  );
};

export default SearchBar;
