import BarCodeScannerPlugin from "../BarCodeScannerPlugin";
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
      {/* <video ref={ref} className="viewfinder" /> */}
      <BarCodeScannerPlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        className="viewfinder"
        qrCodeSuccessCallback={onBarCodeScan}
      />
    </>
  );
};

export default SearchBar;
