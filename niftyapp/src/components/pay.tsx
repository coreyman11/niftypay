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
  const { provider, program } = useContext(AnchorContext);
  const [finalAmount, setFinalAmount] = useState<any>(Number(amount.toFixed()));

  useEffect(() => {
    // console.log("recipient", recipient.toBase58())
    console.log("recipient", recipient);
    console.log("props benefit chosen discount", props.benefitChosen)
    if (props?.benefitChosen) {
      setFinalAmount(((1 - ((props?.benefitChosen?.discount || 0) * 0.01)) * (Number(amount.toFixed()))));
    }
  }, []);

  const sendPayment = async () => {
    // verify NFT here
    try {
      if (props.benefitChosen) {
        const tokenAccount = await getAssociatedTokenAddress(
          props.benefitChosen.mint,
          provider.wallet.publicKey
        );
        await program.rpc.verifyNft({
          accounts: {
            user: provider.wallet.publicKey,
            nftMint: props.benefitChosen.mint,
            nftTokenAccount: tokenAccount,
            benefit: props.benefitChosen.id,
            businessOwner: recipient,
            systemProgram: web3.SystemProgram.programId,
          },
          signers: [],
        });
      }
      const tx = await createTransaction(provider.connection, provider.wallet.publicKey, recipient, new BigNumber(finalAmount), {
        reference,
        memo,
      });
      await provider.send(tx);
    } catch (err) {
        alert(err);
    }
  }

  const walletAddress = provider?.wallet?.publicKey?.toBase58();
  console.log(props, finalAmount, walletAddress);
  return (
    <div className="payContainer container">
      <div className="top">
        <img src="./backarrow.png" height="20px" className="backArrow" onClick={() => props.setTab(Tab.Benefits)} ></img>
        <p className="header"><span className="highlight">&nbsp;Pay&nbsp;</span> 💸</p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content">
        <div className="amounts">
          <div className="bigAmount">{finalAmount.toFixed(3)}</div>
          <div className="subAmount">SOL</div>
        </div>
        <div className="middle">
          <div className="payDetailGroup">
            <div className="payDetailHeader">Original Amount</div>
            <div className="payDetailItem"> {amount.toFixed(3)} SOL</div>
          </div>
          {props?.benefitChosen?.discount &&
          <div className="payDetailGroup">
            <div className="payDetailHeader">NFT Benefit</div>
            <div className="payDetailItem"> {props?.benefitChosen?.discount}% Discount</div>
          </div>
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
