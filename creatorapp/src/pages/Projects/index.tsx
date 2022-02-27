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
            setProjects(projects.map((p: { account: any; }) => p.account))

        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        getProjectList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="connected-container">
            <Link to="new">Create Collection</Link>
            <div className="gif-grid">
                {projects.map(({ name }, id) => (
                    <div className="gif-item" key={id}>
                        {name}
                    </div>
                ))}
            </div>
        </div>
    );
};
