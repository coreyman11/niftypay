import { useState, useContext, useEffect } from "react";
import { AnchorContext } from "../../provider/anchorProvider";
import {
    Link,
  } from "react-router-dom";

export const Projects = () => {
    const { program, provider } = useContext(AnchorContext);
    const [projects, setProjects] = useState([]);
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
        getProjectList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="homeContainer container connected-container">
            <div className="topArea">
                <div className="arrowArea"> &nbsp; </div>
                <div className="walletArea">{provider.wallet.publicKey}</div>
            </div>
            <div className="header">Your Nifty Collections</div>
            <div className="subheader">You have no collections with Nifty Pay benefits... yet.</div>
            <div className="gif-grid">
                {projects.map(({ name, id }) => (
                    <div className="project" key={id}>
                        <div className="projectName">{name}</div>
                        <div className="projectButton"><Link to={id + "/new"}>Add a Benefit</Link></div>
                    </div>
                ))}
            </div>
            <Link to="new" className="button"> Add a Collection</Link>
        </div>
    );
};
