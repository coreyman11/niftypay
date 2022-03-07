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
      props.setProps({ urlData: parseURL(data) })
      props.setTab(Tab.Benefits); 
  }
  
  return (
    <div className="scanContainer container">
      <div className="top">
        <img src="./backarrow.png" onClick={() => {props.setProps({ urlData: null }); props.setTab(Tab.Home)}} height="20px" className="backArrow" alt=""></img>
        <p className="header">Scan <span className="highlight">&nbsp;QR Code&nbsp;</span></p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content qrContainer">
        <Html5QrcodePlugin
          fps={10}
          qrbox={300}
          disableFlip={false}
          qrCodeSuccessCallback={onSuccess}
          verbose
        />
      </div>
    </div>
  );
};
