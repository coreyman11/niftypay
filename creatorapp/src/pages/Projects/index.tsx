import { useState, useContext, useEffect } from "react";
import { AnchorContext } from "../../provider/anchorProvider";
import {
    Link,
  } from "react-router-dom";

export const Projects = () => {
    const { program, provider } = useContext(AnchorContext);
    const [projects, setProjects] = useState([]);
    const [userWallet, setUserWallet] = useState([]);
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
                    ...p.account
                }
            }))

        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        if(!provider?.wallet?.publicKey) return;
        console.log("wallet", provider.wallet.publicKey.toBase58())
        setUserWallet(provider.wallet.publicKey.toBase58().slice(0,4).concat('...',provider.wallet.publicKey.toBase58().slice(provider.wallet.publicKey.toBase58().length-4,provider.wallet.publicKey.toBase58().length)))
        getProjectList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provider?.wallet?.publicKey])

    return (
        <div className="homeContainer container connected-container">
            <div className="topArea">
                <div className="arrowArea"> &nbsp; </div>
                <div className="walletArea">{userWallet}</div>
            </div>
            <div className="header">Your Nifty Collections</div>
            {!projects.length && <div className="subheader">You have no collections with Nifty Pay benefits... yet.</div>}
            <div className="boxGrid">
                {projects.map(({ name, id }) => (
                    <div className="project box" key={id}>
                        <div className="projectName boxHeader">{name}</div>
                        <div className="secondaryButton"><Link to={id + "/new"}>Add a Benefit</Link></div>
                    </div>
                ))}
            </div>
            <Link to="new" className="button"> Add a Collection</Link>
        </div>
    );
};
