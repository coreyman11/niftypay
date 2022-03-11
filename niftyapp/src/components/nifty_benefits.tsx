import { useState, useContext, useEffect } from "react";
import '../App.css';
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { AnchorContext } from "../provider/anchorProvider";
import { Commitment } from "@solana/web3.js";
import { Tab } from "../types";
import { Nifty } from './nifty';
import { BenefitItem } from './benefitItem';

interface NiftyBenefitsProps {
  setTab: (tab: Tab) => void;
}

const opts: { preflightCommitment: Commitment } = {
  preflightCommitment: 'processed'
}

export const NiftyBenefits: React.FC<NiftyBenefitsProps> = (props) => {
  const [benefits, setBenefits] = useState<any>([]);
  const { provider, program } = useContext(AnchorContext);

  const getBenefitList = async () => {
    try {
      const benefits = await program.account.benefit.all([]);
      console.log("Got the benefits", benefits)
      setBenefits(benefits.map(p => ({...p.account, id: p.publicKey})))
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    getBenefitList();
    console.log("got benefits");
  }, [])

  return (
    <div className="homeContainer container">
      <div className="top">
        <img src="./backarrow.png" height="20px" alt="" className="backArrow" onClick={() => {props.setTab(Tab.Home); }}></img>
        <p className="header">View <span className="highlight">&nbsp;Benefits&nbsp;</span></p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content">
        {
          benefits.map((benefit) => {
            console.log("benefits to show", benefit)
            return (
              <BenefitItem {...props}
                onClick={() => console.log("fake chosen")}
                key={benefit.name}
                benefitName={benefit.name}
                businessOwner={benefit.businessOwner}
                claimable={benefit.allowedUsage}
                discount={benefit.discount}
                perk={""}
                selected={false}
                logo={"../milkbar.png"}
              />
            )
          })
        }
      <BenefitItem {...props}
          onClick={() => console.log("fake chosen")}
          key={"AMC"}
          benefitName={"AMC Free Movie Ticket"}
          businessOwner={"58BFz8PD83qBBY8rG9rjJPrWF6FWMduaTBBvkLRqAL8u"}
          claimable={"5"}
          discount={100}
          perk={"Free Ticket"}
          selected={false}
          logo={"../amc.png"}
        />
        <BenefitItem {...props}
          onClick={() => console.log("fake chosen")}
          key={"Starbucks"}
          benefitName={"Starbucks"}
          businessOwner={"58BFz8PD83qBBY8rG9rjJPrWF6FWMduaTBBvkLRqAL8u"}
          claimable={"5"}
          discount={100}
          perk={"Starbucks 20% Off"}
          selected={false}
          logo={"../starbucks.png"}
        />
      </div>
    </div>
  );
};
