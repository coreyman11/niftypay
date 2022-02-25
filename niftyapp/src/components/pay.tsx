import { useState } from "react";
import '../App.css';
import { Tab } from "../types";

interface PayProps {
  setTab: (tab: Tab) => void;
}

export const Pay: React.FC<PayProps> = (props) => {

  return (
    <div className="payContainer container">
      <div className="top">
        <img src="./backarrow.png" height="20px" className="backArrow" onClick={() => props.setTab(Tab.Benefits)} ></img>
        <p className="header">Pay</p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content">
        <div className="amounts">
          <div className="bigAmount">8 USDC</div>
          <div className="subAmount">$8.00</div>
        </div>
        <div className="middle">
          <div className="payDetailGroup">
            <div className="payDetailHeader">Original Amount</div>
            <div className="payDetailItem"> 10 USDC</div>
          </div>
          <div className="payDetailGroup">
            <div className="payDetailHeader">NFT Benefit</div>
            <div className="payDetailItem"> -20%</div>
          </div>
          <div className="payDetailGroup">
            <div className="payDetailHeader">From</div>
            <div className="payDetailItem"> 58af..Auq8</div>
          </div>
          <div className="payDetailGroup">
            <div className="payDetailHeader">To</div>
            <div className="payDetailItem"> sud9...28nd</div>
          </div>
          <div className="payDetailGroup">
            <div className="payDetailHeader">Network Fee</div>
            <div className="payDetailItem"> $0.00001</div>
          </div>
        </div>
      </div>
      <div className="button">Send</div>
    </div>
  );
};
