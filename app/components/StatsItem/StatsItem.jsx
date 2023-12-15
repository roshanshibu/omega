import { getItemStats } from "@/app/utils/api";
import { humanizeTimeDuration } from "@/app/utils/date";
import { useQuery } from "@tanstack/react-query";
import "./StatsItem.css";
import Image from "next/image";

const StatsItem = ({ item }) => {
  const baseUrl =
    "https://raw.githubusercontent.com/roshanshibu/omega_backend/main/images/";
  const { status, error, data } = useQuery({
    queryKey: [item.name],
    queryFn: () => getItemStats(item.name),
  });

  //   if (status === "pending") return <p>Loading...</p>;
  //   return <p>Stats Item here {data.toString()} </p>;
  return (
    <div className="itemStatContainer">
      <div className="itemStatsHeader">
        <p>{item.name}</p>
        <div className="statsLastBoughtStatContainer">
          <p className="statsLastBoughtLabel">last bought</p>
          <p>{humanizeTimeDuration(item.lastChecked)}</p>
        </div>
      </div>

      <div className="minStats">
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
    </div>
  );
};

export default StatsItem;
