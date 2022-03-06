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
    }
  }, [provider?.connection])

  return (
    <div className="homeContainer container">
      <div className="top">
        <p>&nbsp; &nbsp; &nbsp;</p>
        <p className="header">Nifty</p>
        <img src="./qricon.png" height="30px" className="backArrow" onClick={() => props.setTab(Tab.Scan)}></img>
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
      </div>
    </div>
  );
};
