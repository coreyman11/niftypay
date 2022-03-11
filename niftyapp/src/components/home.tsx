import { useState, useContext, useEffect } from "react";
import '../App.css';
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { AnchorContext } from "../provider/anchorProvider";
import { Commitment } from "@solana/web3.js";
import { Tab } from "../types";
import { Nifty } from './nifty';

interface HomeProps {
  setTab: (tab: Tab) => void;
}

const opts: { preflightCommitment: Commitment } = {
  preflightCommitment: 'processed'
}

export const Home: React.FC<HomeProps> = (props) => {
  const [nftData, setNftData] = useState<any[]>([]);
  const { provider, program } = useContext(AnchorContext);
  //temp
  const [benefits, setBenefits] = useState<any>([]);

  const getAllNftData = async () => {
    try {
      const connection = provider.connection
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

  useEffect(() => {
    if(provider && provider.connection) {
      getAllNftData();
      getBenefitList();
    }
  }, [provider?.connection])

  //temp
  const getBenefitList = async () => {
    try {
      const benefits = await program.account.benefit.all([]);
      console.log("Got the benefits", benefits)
      setBenefits(benefits.map(p => ({...p.account, id: p.publicKey})))
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="homeContainer container">
      <div className="top">
        <p>&nbsp; &nbsp; &nbsp;</p>
        <p className="header">✨ Your <span className="highlight">&nbsp;NFTs&nbsp;</span></p>
        <img src="./qricon.png" height="30px" className="backArrow" onClick={() => props.setTab(Tab.Pay)}></img>
      </div>
      <div className="content homeContent">
        {nftData.length ?
          (nftData.map((nft) => {
            console.log("benefits to show", nft)
            return (
              <Nifty
                key={nft.mint}
                jsonRawData={nft.data.uri}
              />
            )
          })) :
          "You have no NFTs in this wallet."
        }
        {
            benefits.map((benefit) => {
              console.log("benefits to show", benefit)
              return (
                <div key={benefit.name} className="benefitItem">
                  {benefit.name}
                  {/* {benefit.businessOwner} */}
                  <img src={benefit.businessLogo} />
                </div>
              )
            })
          }
      </div>
    </div>
  );
};
