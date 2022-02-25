import { useState } from "react";
import '../App.css';
import { Tab } from "../types";

interface NumpadProps {
  setTab: (tab: Tab) => void;
}

export const Numpad: React.FC<NumpadProps> = (props) => {
  
  return (
    <div className="homeContainer container">
       <div className="top">
        <p>&nbsp; &nbsp; &nbsp;</p>
        <p className="header">Merchant QR Code</p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content">
        <div className="amounts">
          <div className="bigAmount">8 USDC</div>
          <div className="subAmount">$8.00</div>
        </div>
        <div className="numberPad">  
          <div className="numberRow">
            {[1,2,3].map(num => {
              return <button className="number">{num}</button>;
            })}
          </div>
          <div className="numberRow">
            {[4,5,6].map(num => {
              return <button className="number">{num}</button>;
            })}
          </div>
          <div className="numberRow">
            {[7,8,9].map(num => {
              return <button className="number">{num}</button>;
            })}
          </div>
        </div>
      </div>
      <div className="button" onClick={() => props.setTab(Tab.QRCode)}>Generate QR Code</div>
    </div>
  );
};
