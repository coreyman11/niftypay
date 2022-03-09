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
  const [benefitChosen, setBenefitChosen] = useState<any>(null);
  const [amt, setAmt] = useState((Number(amount || 0)));
  const { provider, program } = useContext(AnchorContext);
  const [urlData, setUrlData] = useState({});

  const goToPay = async () => {
    props.setProps({ urlData, benefitChosen })
    props.setTab(Tab.Pay)
  }

  const getBenefitList = async () => {
    try {
      const benefits = await program.account.benefit.all([
        {
            memcmp: {
                offset: 8 + // Discriminator.
                    32 +  // Project Id.
                    32 ,  // Creator.
                bytes: recipient,
            }
        }
    ]);
      console.log("Got the benefits", benefits)
      setBenefits(benefits.map(p => ({...p.account, id: p.publicKey})))
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
    console.log("urldata", props.urlData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(!benefits.length) return;
    const benefitsToShow = benefits.filter(benefit => (nftData.findIndex(nft => (nft.mint === benefit.mint.toBase58())) >= 0));
    if(!benefitsToShow.length) return;
    setBenefitChosen(benefitsToShow[0]);
  }, [benefits.length, nftData.length]);



  const benefitsToShow = benefits.filter(benefit => (nftData.findIndex(nft => (nft.mint === benefit.mint.toBase58())) >= 0));
  // Add when filtering is ready

  return (
    <div className="benefitsContainer container">
      <div className="top">
        <img src="./backarrow.png" height="20px" alt="" className="backArrow" onClick={() => { props.setProps({ urlData: null }); props.setTab(Tab.Scan); }}></img>
        <p className="header">Choose <span className="highlight">&nbsp;Benefits&nbsp;</span></p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content">
        <div className="amounts">
          <div className="bigAmount">{amt.toFixed(3)}</div>
          <div className="subAmount">SOL</div>
        </div>
        <div className="middle">
          {
            benefitsToShow.map((benefit) => {
              console.log("benefits to show", benefit)
              return (
                <BenefitItem {...props}
                  onClick={() => chooseBenefit(benefit)}
                  key={benefit.name}
                  benefitName={benefit.name}
                  businessOwner={benefit.businessOwner}
                  claimable={benefit.allowedUsage}
                  discount={benefit.discount}
                  selected={benefitChosen?.id?.toBase58() === benefit?.id?.toBase58()}
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
