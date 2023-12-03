import "./SearchBar.css";
import { useZxing } from "react-zxing";

const constraints = {
  video: true,
  audio: false,
};

const SearchBar = ({ onBarCodeScan, deviceId }) => {
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
    </>
  );
};

export default SearchBar;
