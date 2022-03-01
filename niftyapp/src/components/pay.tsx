import { useState, useContext, useEffect } from "react";
import '../App.css';
import { Tab } from "../types";
import { createTransaction } from '@solana/pay';
import { AnchorContext } from "../provider/anchorProvider";
import BigNumber from 'bignumber.js';
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";


interface PayProps {
  setTab: (tab: Tab) => void;
  urlData: any
}

export const Pay: React.FC<PayProps> = (props) => {
  const { recipient, memo, amount, reference } = props.urlData || {};
  const [amt, setAmt] = useState((Number(amount || 0)));
  const [benefitChosen, setBenefitChosen] = useState<any>({ discount: 0});
  const { provider, program } = useContext(AnchorContext);
  const finalAmount = new BigNumber((((1 - (benefitChosen.discount * 0.01)) * amt)) || 0); //assuming percentage discount for now

  useEffect(() => {
    console.log("final amount", finalAmount);
    console.log("benefitchosen", benefitChosen);
    console.log("recipient", recipient.PublicKey)
    console.log("provide wallet publickey", provider.wallet.publicKey)
    console.log("url data", props.urlData)
  }, []);

  const sendPayment = async () => {
    // verify NFT here
    const tx = await createTransaction(provider.connection, provider.wallet.publicKey, recipient, finalAmount, {
      reference,
      memo,
    });
    await provider.send(tx);
  }

  return (
    <div className="payContainer container">
      <div className="top">
        <img src="./backarrow.png" height="20px" className="backArrow" onClick={() => props.setTab(Tab.Benefits)} ></img>
        <p className="header">Pay</p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content">
        <div className="amounts">
          <div className="bigAmount">{amt} USDC</div>
          <div className="subAmount">${amt}</div>
        </div>
        <div className="middle">
          <div className="payDetailGroup">
            <div className="payDetailHeader">Original Amount</div>
            <div className="payDetailItem"> ${amt}</div>
          </div>
          <div className="payDetailGroup">
            <div className="payDetailHeader">NFT Benefit</div>
            <div className="payDetailItem"> {benefitChosen.discount}</div>
          </div>
          <div className="payDetailGroup">
            <div className="payDetailHeader">From</div>
            <div className="payDetailItem"> 58af..Auq8</div>
          </div>
          <div className="payDetailGroup">
            <div className="payDetailHeader">To</div>
            <div className="payDetailItem"> {"recipient"}</div>
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
