import { useState, useContext, useEffect } from "react";
import '../App.css';
import { Tab } from "../types";
import { createTransaction } from '@solana/pay';
import { AnchorContext } from "../provider/anchorProvider";
import BigNumber from 'bignumber.js';
import {web3} from '@project-serum/anchor';
import { getAssociatedTokenAddress } from "@solana/spl-token"


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
  const [finalAmount, setFinalAmount] = useState<any>(amt);

  useEffect(() => {
    console.log("recipient", recipient.toBase58())
    console.log("props benefit chosen discount", props.benefitChosen)
    if (props.benefitChosen !== undefined) {
      setBenefitChosen(props.benefitChosen)
      setFinalAmount(((1 - (props.benefitChosen.discount * 0.01)) * amt).toFixed(2));
    }
  }, []);

  const sendPayment = async () => {
    // verify NFT here
    const tokenAccount = await getAssociatedTokenAddress(
      props.benefitChosen.mint,
      provider.wallet.publicKey
    );
    await program.rpc.verifyNft({
      accounts: {
        user: provider.wallet.publicKey,
        nftMint: props.benefitChosen.mint,
        nftTokenAccount: tokenAccount,
        benefit: benefitChosen.publicKey,
        businessOwner: recipient.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [],
    });
    const tx = await createTransaction(provider.connection, provider.wallet.publicKey, recipient, new BigNumber(finalAmount), {
      reference,
      memo,
    });
    await provider.send(tx);
  }

  const walletAddress = provider?.wallet?.publicKey;
  console.log(props);
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
          {benefitChosen.discount !== 0 ? 
          <div className="payDetailGroup">
            <div className="payDetailHeader">NFT Benefit</div>
            <div className="payDetailItem"> {benefitChosen.discount}% Discount</div>
          </div> :
          ""
          }
          <div className="payDetailGroup">
            <div className="payDetailHeader">From</div>
            <div className="payDetailItem"> {walletAddress?.slice(0,4).concat('...',walletAddress?.slice(walletAddress?.length-4,walletAddress?.length))}</div>
          </div>
          <div className="payDetailGroup">
            <div className="payDetailHeader">To</div>
            <div className="payDetailItem"> {recipient.toBase58().slice(0,4).concat('...',recipient?.toBase58()?.slice(recipient?.toBase58()?.length-4,recipient?.toBase58()?.length))}</div>
          </div>
        </div>
      </div>
      <div className="button" onClick={() => sendPayment()}>Send</div>
    </div>
  );
};
