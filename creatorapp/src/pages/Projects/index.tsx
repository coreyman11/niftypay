import { useState, useContext, useEffect } from "react";
import { AnchorContext } from "../../provider/anchorProvider";
import {
    Link,
  } from "react-router-dom";

interface Project {
    name: string; 
    id: string;
    contractId: string;
    creator: string;
}

export const Projects = () => {
    const { program, provider } = useContext(AnchorContext);
    const [projects, setProjects] = useState<Project[]>([]);
    const [userWallet, setUserWallet] = useState([]);
    const [benefits, setBenefits] = useState<any>([]);
    const getProjectList = async () => {
        try {
            const projects = await program.account.project.all([
                {
                    memcmp: {
                        offset: 8 + // Discriminator.
                            32,  // NFT public key.
                        bytes: provider?.wallet?.publicKey.toBase58(),
                    }
                }
            ]);
            console.log("Got the projects", projects)
            setProjects(projects.map((p: { account: any; publicKey: any }) => {
                
                return {
                    id: p.publicKey.toBase58(),
                    contractId: p.account.contractId.toBase58(),
                    creator: p.account.creator.toBase58(),
                    name: p.account.name,
                    // ...p.account
                }
            }))

        } catch (error) {
            console.log("error", error);
        }
    }

    const getBenefitList = async () => {
        try {
          const benefits = await program.account.benefit.all();
          setBenefits(benefits.map((p:any) => ({...p.account, id: p.publicKey})))
          console.log("Got the benefits", benefits)
        } catch (error) {
          console.error("error", error);
        }
      }

    useEffect(() => {
        if(!provider?.wallet?.publicKey) return;
        console.log("wallet", provider.wallet.publicKey.toBase58())
        setUserWallet(provider.wallet.publicKey.toBase58().slice(0,4).concat('...',provider.wallet.publicKey.toBase58().slice(provider.wallet.publicKey.toBase58().length-4,provider.wallet.publicKey.toBase58().length)))
        getProjectList();
        getBenefitList();
        console.log("Got the projects", projects)
        console.log("Got the benefits", benefits)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provider?.wallet?.publicKey])

    return (
        <div className="homeContainer container connected-container">
            <div className="topArea">
                <div className="arrowArea"> &nbsp; </div>
                <div className="walletArea">{userWallet}</div>
            </div>
            <div className="header">Your <span className="highlight">&nbsp;Nifty&nbsp;</span> Collections</div>
            {!projects.length && <div className="subheader">You have no collections with Nifty Pay benefits... yet.</div>}
            <div className="boxGrid">
                {projects.map(({ name, id , creator, contractId }) => (
                    <div className="projectBox" key={id}>
                        <div className="projectDetailName">{name}</div>
                        <div className="projectBoxColumns">
                            <div className="projectDetails">
                                <div className="projectDetailGroup">
                                    <div className="projectDetailHeader">ID</div>
                                    <div className="projectDetailText">{id.slice(0,4).concat('...',id.slice(id.length-4,id.length))}</div>
                                </div>
                                <div className="projectDetailGroup">
                                    <div className="projectDetailHeader">NFT Token Address</div>
                                    <div className="projectDetailText">{contractId.slice(0,4).concat('...',contractId.slice(id.length-4,contractId.length))}</div>
                                </div>
                            </div>
                            <div className="projectBenefitsList">
                                <div className="projectDetailHeader">Benefits</div>
                                {benefits.filter((benefit:any) => (id === benefit.projectId.toBase58()))
                                .map((benefit:any) => (
                                    <div className="projectDetailText" key={benefit.id}>
                                       ☑️ {benefit.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Link className="secondaryButton" to={id + "/new"}>Add a Benefit</Link>
                    </div>
                ))}
            </div>
            <Link to="new" className="button"> Add a Collection</Link>
        </div>
    );
};
