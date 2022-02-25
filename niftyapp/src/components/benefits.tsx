import { useState } from "react";
import '../App.css';
import { BenefitItem } from './benefitItem';
import { Tab } from "../types";

interface BenefitProps {
  setTab: (tab: Tab) => void;
}

export const Benefits: React.FC<BenefitProps> = (props) => {
  const [benefitChosen, setBenefitChosen] = useState('No result');

  return (
    <div className="benefitsContainer container">
      <div className="top">
        <img src="./backarrow.png" height="20px" className="backArrow" onClick={() => props.setTab(Tab.Scan)}></img>
        <p className="header">Choose Benefits</p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content">
        <div className="amounts">
          <div className="bigAmount">8 USDC</div>
          <div className="subAmount">$8.00</div>
        </div>
        <div className="middle">
          <BenefitItem />
          <BenefitItem />
        </div>
      </div>
      <div className="button" onClick={() => props.setTab(Tab.Pay)}>Next</div>
    </div>
  );
};
