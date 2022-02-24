import { useState } from "react";
import '../App.css';
import { QrReader } from 'react-qr-reader';

export const Scan = () => {
  const [data, setData] = useState('No result');

  return (
    <div className="scanContainer container">
      <div className="top">
        <img src="./backarrow.png" height="20px" className="backArrow"></img>
        <p className="header">Scan QR Code</p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content">
        {/* <QrReader onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }
            if (!!error) {
              console.info(error);
            }
          }}
        /> */}
        <p>{data}</p>
      </div>
    </div>
  );
};
