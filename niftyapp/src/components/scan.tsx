import { useEffect, useState } from "react";
import '../App.css';
import { Tab } from "../types";
import { parseURL } from '@solana/pay';
import Html5QrcodePlugin from "./scanner";

interface ScanProps {
  setTab: (tab: Tab) => void;
  setProps: (props: any) => void;
}


export const Scan: React.FC<ScanProps> = (props) => {
  const onSuccess = (data) => {
      props.setTab(Tab.Benefits); 
      props.setProps({ urlData: parseURL(data) })
  }
  return (
    <div className="scanContainer container">
      <div className="top">
        <img src="./backarrow.png" onClick={() => props.setTab(Tab.Home)} height="20px" className="backArrow" alt=""></img>
        <p className="header">Scan QR Code</p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content" 
        >
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onSuccess}
          verbose
        />
      </div>
    </div>
  );
};
