import '../App.css';
import { useState, useContext, useEffect } from "react";

interface BenefitItemsProps {
  benefitName: any
  businessOwner: any
  claimable: any
  discount: number
  perk: string
  onClick: () => void;
  selected: boolean
  logo: string
}

export const BenefitItem: React.FC<BenefitItemsProps> = (props) => {

  useEffect(() => {
    console.log("Benefit: ", props.benefitName)
  }, [])

  return (
    <div onClick={props.onClick} className={`benefitItem ${props.selected && 'chosenOne'}`}>
      <img src={props.logo} className="benefitImg"/>
      <div className="benefitDetails">
        <div className="benefitDetailsTop">
          <div className="benefitDetailGroup">
            <div className="benefitDetailHeader">NAME OF BENEFIT</div>
            <div className="benefitDetailItem">{props.benefitName}</div>
          </div>
        </div>
        <div className="benefitDetailsBottom">
         <div className="benefitDetailGroup">
            <div className="benefitDetailHeader">BENEFIT</div>
            <div className="benefitDetailItem">{props.discount < 100 ? props.discount + "% Discount" : props.perk}</div>
          </div>
          {/* <div className="benefitDetailGroup">
            <div className="benefitDetailHeader">CLAIMABLE</div>
            <div className="benefitDetailItem">{props.claimable}</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
