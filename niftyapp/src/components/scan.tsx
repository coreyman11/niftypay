import { useState } from "react";
import '../App.css';
import { QrReader } from 'react-qr-reader';
import { Tab } from "../types";

interface ScanProps {
  setTab: (tab: Tab) => void;
}

export const Scan: React.FC<ScanProps> = (props) => {
  const [data, setData] = useState('No result');

  return (
    <div className="scanContainer container">
      <div className="top">
        <img src="./backarrow.png" onClick={() => props.setTab(Tab.Home)} height="20px" className="backArrow"></img>
        <p className="header">Scan QR Code</p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content" onClick={() => props.setTab(Tab.Benefits)}>
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
