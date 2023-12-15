import Image from "next/image";
import "./StatsItemDetail.css";

const StatsItemDetail = ({ image, name, shopName, shopImage, price }) => {
  return (
    <div className="sidContainer">
      <Image
        draggable={false}
        width={100}
        height={100}
        src={image}
        alt="item"
      />
      <p className="sidProductName">{name}</p>
      <div className="sidRowContainer">
        <Image
          draggable={false}
          width={20}
          height={20}
          src={shopImage}
          alt="item"
        />
        <p className="sidShopName">{shopName}</p>
      </div>
      <div className="sidRowContainer extraPadding">
        <p className="sidEuroSymbol">€</p>
        <p className="sidPriceText">{price}</p>
      </div>
    </div>
  );
};

export default StatsItemDetail;
