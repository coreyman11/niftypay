import { useState, useContext, useEffect } from "react";
import { AnchorContext } from "../../provider/anchorProvider";
import { useParams } from "react-router-dom";
import {web3} from '@project-serum/anchor';

export const ProjectForm = (props) => {
    let params = useParams();
    const { program, provider } = useContext(AnchorContext);
    const [inputValue, setInputValue] = useState('');
    const createProject = async () => {
        try {
            const creator = provider.wallet.publicKey;
            const project = web3.Keypair.generate();
            const nftAddress = web3.Keypair.generate();
            const member1 = web3.Keypair.generate();
            await program.rpc.createProject('Magnum Opus', nftAddress.publicKey, [member1.publicKey], {
                accounts: {
                    project: project.publicKey,
                    creator,
                    systemProgram: web3.SystemProgram.programId,
                },
                signers: [project],
            });
            console.log("Got the projects", project);

        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        if(params.projectId === 'new') return;

    }, [params.projectId]);
    return (
        <div className="">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    createProject();
                }}
            >
                <input
                    type="text"
                    placeholder="Enter Project Name!"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="cta-button submit-gif-button">
                    Create
                </button>
            </form>
        </div>
    );
};
