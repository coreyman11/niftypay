import { useState } from "react";
import '../App.css';

export const BenefitItem = () => {

  return (
    <div className="benefitItem">
      <img src="./logo192.png" className="benefitImg"/>
      <div className="benefitDetails">
        <div className="benefitDetailsTop">
          <div className="benefitDetailGroup">
            <div className="benefitDetailHeader">BUSINESS</div>
            <div className="benefitDetailItem">Le Boulangerie</div>
          </div>
          <div className="benefitDetailGroup">
            <div className="benefitDetailHeader">FREQUENCY</div>
            <div className="benefitDetailItem">Renews Weekly</div>
          </div>
        </div>
        <div className="benefitDetailsBottom">
          <div className="benefitDetailGroup">
            <div className="benefitDetailHeader">BENEFIT</div>
            <div className="benefitDetailItem">$10 Discount</div>
          </div>
        </div>
      </div>
    </div>
  );
};
