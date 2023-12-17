"use client";
import { ItemsContext } from "@/app/page";
import StatsItem from "../StatsItem/StatsItem";
import "./StatsPage.css";
import CalendarIcon from "@/assets/Calendar.svg";
import { useContext, useState } from "react";
import Image from "next/image";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const StatsPage = () => {
  const itemsContext = useContext(ItemsContext);
  const [shopStats, setShopStats] = useState([
    {
      name: "Edeka",
      price: 24.5,
      distance: 6.9,
      locations: [
        [49.4139684, 8.6106684],
        [49.3907245, 8.6763761],
        [49.4135729, 8.6671083],
      ],
    },
    {
      name: "Aldi",
      price: 27.0,
      distance: 2.2,
      locations: [
        [49.4262511, 8.6011362],
        [49.4144429, 8.6649393],
        [49.3977534, 8.6590882],
      ],
    },
    {
      name: "Penny",
      price: 32.4,
      distance: 3.4,
      locations: [
        [49.4139474, 8.6098524],
        [49.3946975, 8.6606386],
      ],
    },
  ]);
  const [selectedShop, setSelectedShop] = useState(0);

  const containerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "0 0 11px 11px",
  };

  const center = {
    lat: 49.414183,
    lng: 8.650915,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCf5doKy3tH6cWG09w-fltw7lpnfGkGOwo",
  });

  const baseUrl =
    "https://raw.githubusercontent.com/roshanshibu/omega_backend/main/images/";

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

      <p className="storeLocationLabel">Stores near you</p>
      <div className="statsLocationContainer">
        <div className="statsLocationHeader">
          {shopStats.map((shop, index) => (
            <div className="shopHeaderInfoContainer" key={index}>
              <Image
                draggable={false}
                width={35}
                height={35}
                src={baseUrl + shop.name + ".svg"}
                alt="item"
                onClick={() => setSelectedShop(index)}
                style={selectedShop !== index ? { opacity: 0.4 } : {}}
              />
              <div
                className={
                  "shopHeaderInfoText " +
                  (selectedShop === index ? "" : "shopHeaderHidden")
                }
              >
                <p>{shop.price} €</p>
                <p className="shopHeaderDistanceText">
                  {shop.distance} km away
                </p>
              </div>
            </div>
          ))}
        </div>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            options={{
              streetViewControl: false,
              zoomControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker
              position={{ lat: 49.414183, lng: 8.650915 }}
              icon={{
                url: baseUrl + "current_pos.svg",
                scaledSize: { width: 30, height: 30 },
              }}
            />

            {shopStats[selectedShop].locations.map((location, index) => (
              <Marker
                key={index}
                position={{ lat: location[0], lng: location[1] }}
                icon={{
                  url: baseUrl + shopStats[selectedShop].name + ".svg",
                  scaledSize: { width: 30, height: 30 },
                }}
              />
            ))}
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default StatsPage;
