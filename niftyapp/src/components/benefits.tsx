import { useState, useContext, useEffect } from "react";
import '../App.css';
import { BenefitItem } from './benefitItem';
import { Tab } from "../types";
import { AnchorContext } from "../provider/anchorProvider";

import { createTransaction } from '@solana/pay';
import { Commitment } from "@solana/web3.js";
import BigNumber from 'bignumber.js';
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import {Connection, clusterApiUrl } from '@solana/web3.js';

interface BenefitProps {
  setTab: (tab: Tab) => void;
  urlData: any
}

const opts: {preflightCommitment : Commitment } = {
  preflightCommitment: 'processed'
}

export const Benefits: React.FC<BenefitProps> = (props) => {
  const { recipient, memo, amount, reference } = props.urlData || {};
  const [nftData, setNftData] = useState<any[]>([]);
  const [benefitChosen, setBenefitChosen] = useState<any>({ discount: 0});
  const [benefits, setBenefits] = useState<any>([]);
  const [amt, setAmt] = useState((Number(amount || 0)));
  const finalAmount = new BigNumber((((1 - (benefitChosen.discount * 0.01)) * amt)) || 0); //assuming percentage discount for now
  const { provider, program } = useContext(AnchorContext);

  const sendPayment = async () => {
    // verify NFT here
    const tx = await createTransaction(provider.connection, provider.wallet.publicKey, recipient, finalAmount, {
      reference,
      memo,
    });
    await provider.send(tx);
  }

  const getBenefitList = async () => {
    try {
      const benefits = await program.account.benefit.all();
      console.log("Got the benefits", benefits)
      setBenefits(benefits.map(p => p.account))

    } catch (error) {
      console.log("error", error);
    }
  }

  const getAllNftData = async () => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'), opts.preflightCommitment); //provider.connection
      const nfts = await getParsedNftAccountsByOwner({
        publicAddress: provider.wallet.publicKey,
        connection,
      });
      console.log(nfts);
      setNftData(nfts);
      return nfts;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllNftData();
    getBenefitList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const benefitsToShow = benefits.filter(benefit => (nftData.findIndex(nft => (nft.mint === benefit.mint)) >= 0));
  return (
    <div className="benefitsContainer container">
      <div className="top">
        <img src="./backarrow.png" height="20px" alt="" className="backArrow" onClick={() => props.setTab(Tab.Scan)}></img>
        <p className="header">Choose Benefits</p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content">
        <div className="amounts">
          <div className="bigAmount">{amt} USDC</div>
          <div className="subAmount">${amt}</div>
        </div>
        <div className="middle">
          {
            benefitsToShow.map((benefit) => {
              return <BenefitItem />
            })
          }
          <BenefitItem />
          <BenefitItem />
        </div>
      </div>
      <div className="button" onClick={() => sendPayment()}>Next</div>
    </div>
  );
};
