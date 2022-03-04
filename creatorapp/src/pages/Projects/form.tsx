import { useState, useContext, useEffect } from "react";
import { AnchorContext } from "../../provider/anchorProvider";
import { useParams, useNavigate } from "react-router-dom";
import {web3} from '@project-serum/anchor';
import {
    Link,
  } from "react-router-dom";
  import {PublicKey } from '@solana/web3.js';

export const ProjectForm = () => {
    let params = useParams();
    const navigate = useNavigate();
    const { program, provider } = useContext(AnchorContext);
    const [userWallet, setUserWallet] = useState('');
    const [collectionName, setCollectionName] = useState('');
    const [collectionId, setCollectionId] = useState('');
    const [walletId1, setWalletId1] = useState('');
    const [walletId2, setWalletId2] = useState('');
    const [walletId3, setWalletId3] = useState('');
    const createProject = async () => {
        try {
            const creator = provider.wallet.publicKey;
            const project = web3.Keypair.generate();
            await program.rpc.createProject(collectionName, new PublicKey(collectionId), [new PublicKey(walletId1)], {
                accounts: {
                    project: project.publicKey,
                    creator,
                    systemProgram: web3.SystemProgram.programId,
                },
                signers: [project],
            });
            console.log("Got the projects", project);
            navigate('/');

        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        console.log("wallet", provider.wallet.publicKey)
        if(params.projectId === 'new') return;
        setUserWallet(provider.wallet.publicKey.toBase58().slice(0,4).concat('...',provider.wallet.publicKey.toBase58().slice(provider.wallet.publicKey.toBase58().length-4,provider.wallet.publicKey.toBase58().length)))
    }, [params.projectId]);
    return (
        <div className="addProjectContainer container connected-container">
            <div className="topArea">
                <div className="arrowArea"><Link className="arrowLink" to="/">{"<-"}</Link> </div>
                <div className="walletArea">{userWallet}</div>
            </div>
            <div className="header">Add a Collection</div>
            <div className="subheader">Choose a collection you’re the owner of or add your collection manually.</div>
            <div className="formContainer">
                <form
                    className="formContainer"
                    onSubmit={(event) => {
                        event.preventDefault();
                        createProject();
                    }}
                >
                    <div className="inputGroup">
                        <div className="inputLabel">PROJECT OR COLLECTION NAME</div>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="The Best NFT Project Ever"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                        />
                    </div>
                    <div className="inputGroup">
                        <div className="inputLabel">NFT TOKEN ADDRESS</div>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="0xkaj92jspigp9jrin093rjf0935018hfqw8rjqowir"
                            value={collectionId}
                            onChange={(e) => setCollectionId(e.target.value)}
                        />
                    </div>
                    <div className="inputGroup">
                        <div className="inputLabel">CORE MEMBERS WALLET IDS</div>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="0xkaj92jspigp9jrin093rjf0935018hfqw8rjqowir"
                            value={walletId1}
                            onChange={(e) => setWalletId1(e.target.value)}
                        />
                        <input
                            className="inputField"
                            type="text"
                            placeholder="0xkaj92jspigp9jrin093rjf0935018hfqw8rjqowir"
                            value={walletId2}
                            onChange={(e) => setWalletId2(e.target.value)}
                        />
                        <input
                            className="inputField"
                            type="text"
                            placeholder="0xkaj92jspigp9jrin093rjf0935018hfqw8rjqowir"
                            value={walletId3}
                            onChange={(e) => setWalletId3(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="button">
                        Create Collection
                    </button>
                </form>
            </div>
            
        </div>
    );
};
