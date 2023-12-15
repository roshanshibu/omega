import { getItemStats } from "@/app/utils/api";
import { humanizeTimeDuration } from "@/app/utils/date";
import { useQuery } from "@tanstack/react-query";
import "./StatsItem.css";
import Image from "next/image";
import { useState } from "react";
import StatsItemDetail from "./StatsItemDetail";

const StatsItem = ({ item }) => {
  const [animHelper, setAnimHelper] = useState(true);

  const mountedStyle = {
    animation: "fadeIn 300ms",
  };

  const unmountedStyle = {
    animation: "fadeOut 300ms",
    animationFillMode: "forwards",
  };

  const toggleMinMaxView = () => {
    setAnimHelper((prev) => !prev);
  };
  const baseUrl =
    "https://raw.githubusercontent.com/roshanshibu/omega_backend/main/images/";
  const { status, error, data } = useQuery({
    queryKey: [item.name],
    queryFn: () => getItemStats(item.name),
  });

  //   if (status === "pending") return <p>Loading...</p>;
  //   return <p>Stats Item here {data.toString()} </p>;
  return (
    <div
      className="itemStatContainer"
      onClick={() => {
        //allow toggle only if data has been loaded
        if (!(status === "pending" || typeof data == "undefined"))
          toggleMinMaxView();
      }}
    >
      <div className="itemStatsHeader">
        <p className="userItemName">{item.name}</p>
        <div className="statsLastBoughtStatContainer">
          <p className="statsLastBoughtLabel">last bought</p>
          <p>{humanizeTimeDuration(item.lastChecked)}</p>
        </div>
      </div>

      {animHelper && (
        <div
          className={"minStats"}
          style={animHelper ? mountedStyle : unmountedStyle}
          onAnimationEnd={() => {
            setAnimHelper(true);
          }}
        >
          {
            /* Shop logo */
            status === "pending" || typeof data == "undefined" ? (
              <div className="skeletonImage shopLogo"></div>
            ) : (
              <Image
                draggable={false}
                width={35}
                height={35}
                src={baseUrl + data[0].shop + ".svg"}
                alt="item"
              />
            )
          }
          <div
            className={
              "statItemInfo " +
              (status === "pending" || typeof data == "undefined"
                ? "skeletonImage"
                : "")
            }
          >
            {
              /* Item image */
              !(status === "pending" || typeof data == "undefined") && (
                <Image
                  draggable={false}
                  width={60}
                  height={60}
                  src={baseUrl + data[0].image}
                  alt="item"
                />
              )
            }
            <div className="statItemInfoTextContainer ">
              <p className="statItemNameLabel">
                {status === "pending" || typeof data == "undefined"
                  ? ""
                  : data[0].name}
              </p>
              <p>
                {status === "pending" || typeof data == "undefined"
                  ? ""
                  : data[0].price + " €"}
              </p>
            </div>
          </div>
        </div>
      )}

      {!animHelper && (
        <div
          className={"maxStats"}
          style={animHelper ? unmountedStyle : mountedStyle}
          onAnimationEnd={() => {
            setAnimHelper(false);
          }}
        >
          {data.map((product, index) => {
            return (
              <StatsItemDetail
                key={index}
                image={baseUrl + product.image}
                name={product.name}
                shopName={product.shop}
                shopImage={baseUrl + product.shop + ".svg"}
                price={product.price}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatsItem;
