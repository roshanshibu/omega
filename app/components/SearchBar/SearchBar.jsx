import "./SearchBar.css";
import { useState } from "react";
import { useZxing } from "react-zxing";

const SearchBar = (onBarCodeScan) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      onBarCodeScan(result.getText());
      console.log(result.getText());
    },
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
