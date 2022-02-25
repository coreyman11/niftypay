import { useState } from "react";
import '../App.css';
import { Tab } from "../types";

interface QRCodeProps {
  setTab: (tab: Tab) => void;
}

export const QRCode: React.FC<QRCodeProps> = (props) => {

  return (
    <div className="benefitsContainer container">
      <div className="top">
        <img src="./backarrow.png" height="20px" className="backArrow" onClick={() => props.setTab(Tab.Numpad)}></img>
        <p className="header">QR Code to Scan</p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content">
        <div className="amounts">
          <div className="bigAmount">8 USDC</div>
          <div className="subAmount">$8.00</div>
        </div>
        <div className="middle">
          <img src="./qrplaceholder.png" className="qrImage"></img>
        </div>
        <div>Scan code with your Nifty app.</div>
        <img src="./solanapay.png" className="solanapay"></img>
      </div>
    </div>
  );
};
