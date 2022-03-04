import { useState, useContext, useEffect } from "react";
import '../App.css';
import { Tab } from "../types";
import { createTransaction } from '@solana/pay';
import { AnchorContext } from "../provider/anchorProvider";
import BigNumber from 'bignumber.js';
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { WalletContext } from '../provider/walletProvider';


interface PayProps {
  setTab: (tab: Tab) => void;
  setProps: (props: any) => void;
  urlData: any
  benefitChosen: any
}

export const Pay: React.FC<PayProps> = (props) => {
  const { recipient, memo, amount, reference } = props.urlData || {};
  const [amt, setAmt] = useState((Number(amount || 0)));
  const [benefitChosen, setBenefitChosen] = useState<any>({ discount: 0});
  const { provider, program } = useContext(AnchorContext);
  const { walletAddress, setWalletAddress } = useContext(WalletContext);
  const [finalAmount, setFinalAmount] = useState<any>(amt);

  useEffect(() => {
    console.log("recipient", recipient.toBase58())
    console.log("props benefit chosen discount", props.benefitChosen)
    if (props.benefitChosen != undefined) {
      setBenefitChosen(props.benefitChosen)
      setFinalAmount(((1 - (props.benefitChosen.discount * 0.01)) * amt));
    }
  }, []);

  const sendPayment = async () => {
    // verify NFT here
    const tx = await createTransaction(provider.connection, provider.wallet.publicKey, recipient, new BigNumber(finalAmount), {
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
          <div className="bigAmount">{finalAmount} USDC</div>
          <div className="subAmount">${finalAmount}</div>
        </div>
        <div className="middle">
          <div className="payDetailGroup">
            <div className="payDetailHeader">Original Amount</div>
            <div className="payDetailItem"> ${amt}</div>
          </div>
          {benefitChosen.discount != 0 ? 
          <div className="payDetailGroup">
            <div className="payDetailHeader">NFT Benefit</div>
            <div className="payDetailItem"> {benefitChosen.discount}% Discount</div>
          </div> :
          ""
          }
          <div className="payDetailGroup">
            <div className="payDetailHeader">From</div>
            <div className="payDetailItem"> {walletAddress.slice(0,4).concat('...',walletAddress.slice(walletAddress.length-4,walletAddress.length))}</div>
          </div>
          <div className="payDetailGroup">
            <div className="payDetailHeader">To</div>
            <div className="payDetailItem"> {recipient.slice(0,4).concat('...',recipient.slice(recipient.length-4,recipient.length))}</div>
          </div>
        </div>
      </div>
      <div className="button" onClick={() => sendPayment()}>Send</div>
    </div>
  );
};
