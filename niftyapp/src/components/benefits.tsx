import { useState, useContext, useEffect } from "react";
import '../App.css';
import { BenefitItem } from './benefitItem';
import { Tab } from "../types";
import { AnchorContext } from "../provider/anchorProvider";
import { Commitment } from "@solana/web3.js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { Connection, clusterApiUrl } from '@solana/web3.js';

interface BenefitProps {
  setTab: (tab: Tab) => void;
  setProps: (props: any) => void;
  urlData: any
}

const opts: {preflightCommitment : Commitment } = {
  preflightCommitment: 'processed'
}

export const Benefits: React.FC<BenefitProps> = (props) => {
  const { recipient, memo, amount, reference } = props.urlData || {};
  const [nftData, setNftData] = useState<any[]>([]);
  const [benefits, setBenefits] = useState<any>([]);
  const [benefitChosen, setBenefitChosen] = useState<any>([]);
  const [amt, setAmt] = useState((Number(amount || 0)));
  const { provider, program } = useContext(AnchorContext);
  const [urlData, setUrlData] = useState({});

  const goToPay = async () => {
    props.setTab(Tab.Pay)
    props.setProps({ urlData, benefitChosen })
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
      console.log("NFTs:", nfts);
      setNftData(nfts);
      return nfts;
    } catch (error) {
      console.log(error);
    }
  };

  const chooseBenefit = async (benefit) => {
    setBenefitChosen(benefit);
    console.log("benefit chosen:", benefitChosen)
  }
  
  useEffect(() => {
    setUrlData(props.urlData)
    getAllNftData();
    getBenefitList();
    setBenefitChosen(benefits[0])
    console.log("benefit chosen", benefitChosen)
    console.log("urldata", props.urlData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const benefitsToShow = benefits.filter(benefit => (nftData.findIndex(nft => (nft.mint === benefit.mint)) >= 0));
  // Add when filtering is ready

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
            benefits.map((benefit) => {
              console.log("benefits to show", benefit)
              return (
                <BenefitItem {...props}
                  onClick={() => chooseBenefit(benefit)}
                  key={benefit.name}
                  benefitName={benefit.name}
                  businessOwner={benefit.businessOwner}
                  claimable={benefit.allowedUsage}
                  discount={benefit.discount}
                />
              )
            })
          }
        </div>
      </div>
      <div className="button" onClick={() => goToPay()}>Next</div>
    </div>
  );
};
