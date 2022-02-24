import { useState } from "react";
import '../App.css';
import { BenefitItem } from './benefitItem';

export const Benefits = () => {

  return (
    <div className="benefitsContainer container">
      <div className="top">
        <img src="./backarrow.png" height="20px" className="backArrow"></img>
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
      <div className="button">Next</div>
    </div>
  );
};
