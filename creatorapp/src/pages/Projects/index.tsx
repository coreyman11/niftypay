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
            const projects = await program.account.project.all();
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
        console.log("wallet", provider.wallet.publicKey.toBase58())
        setUserWallet(provider.wallet.publicKey.toBase58().slice(0,4).concat('...',provider.wallet.publicKey.toBase58().slice(provider.wallet.publicKey.toBase58().length-4,provider.wallet.publicKey.toBase58().length)))
        getProjectList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="homeContainer container connected-container">
            <div className="topArea">
                <div className="arrowArea"> &nbsp; </div>
                <div className="walletArea">{userWallet}</div>
            </div>
            <div className="header">Your Nifty Collections</div>
            <div className="subheader">You have no collections with Nifty Pay benefits... yet.</div>
            <div className="boxGrid">
                {projects.map(({ name, id }) => (
                    <div className="project" key={id}>
                        <div className="projectName">{name}</div>
                        <div className="projectButton"><Link to={id + "/new"}>Add a Benefit</Link></div>
                    </div>
                ))}

                <div className="project box">
                    <div className="projectName boxHeader">Project Name</div>
                    <div className="secondaryButton"><Link to={"/new"}>Add a Benefit</Link></div>
                </div>
                <div className="project box">
                    <div className="projectName boxHeader">Project Name</div>
                    <div className="secondaryButton"><Link to={"/new"}>Add a Benefit</Link></div>
                </div>
            </div>
            <Link to="new" className="button"> Add a Collection</Link>
        </div>
    );
};
