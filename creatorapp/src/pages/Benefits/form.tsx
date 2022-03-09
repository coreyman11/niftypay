import { useState, useContext, useEffect } from "react";
import { AnchorContext } from "../../provider/anchorProvider";
import { web3 } from '@project-serum/anchor';
import {
    Link,  useParams, useNavigate
  } from "react-router-dom";
import { PublicKey } from "@solana/web3.js";


export const BenefitForm = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { program, provider } = useContext(AnchorContext);
    const [benefitName, setBenefitName] = useState('');
    const [benefitType, setBenefitType] = useState('');
    const [businessWallet, setBusinessWallet] = useState('');
    const [discount, setDiscount] = useState(20);
    const [frequency, setFrequency] = useState('');
    const [userWallet, setUserWallet] = useState('');

    const projectPubkey = new PublicKey(params.projectId || '');
    const createBenefit = async () => {
        try {
           const projectAccount = await program.account.project.fetch(projectPubkey);
            const benefit = web3.Keypair.generate(); 
            await program.rpc.createBenefit(
                projectPubkey, 
                benefitName, //name
                { percentageDiscount: {} }, //benefitType
                { oneTime: {} }, // frequency
                2, //allowed usage
                discount, //discount %
                new PublicKey(businessWallet),
                projectAccount.contractId,
                {
                accounts: {
                    benefit: benefit.publicKey,
                    creator: provider.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId,
                },
                signers: [benefit],
            });

            navigate('/congrats');

        } catch (error) {
            console.log("error", error);
        }
    }
    
    useEffect(() => {
        if(!provider?.wallet?.publicKey) return;
        setUserWallet(provider.wallet.publicKey.toBase58().slice(0,4).concat('...',provider.wallet.publicKey.toBase58().slice(provider.wallet.publicKey.toBase58().length-4,provider.wallet.publicKey.toBase58().length)));
    }, [provider?.wallet?.publicKey]);

    return (
        <div className="addProjectContainer container connected-container">
            <div className="topArea">
                <div className="arrowArea"><Link className="arrowLink" to="/">{"<-"}</Link> </div>
                <div className="walletArea">{userWallet}</div>
            </div>
            <div className="header">Add Benefits to Collection</div>
            <div className="subheader">What benefits do you want this NFT collection to give to holders?</div>
                <form
                    className="formContainer"
                    onSubmit={(event) => {
                        event.preventDefault();
                        createBenefit();
                    }}
                >
                    <div className="inputGroup">
                        <div className="inputLabel">NAME OF BENEFIT</div>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="Starbucks: 20% Discount"
                            value={benefitName}
                            onChange={(e) => setBenefitName(e.target.value)}
                        />
                    </div>
                    <div className="inputGroupRow">
                        <div className="inputGroup smallInputGroup">
                            <div className="inputLabel">TYPE OF BENEFIT</div>
                            <select name="benefitType" id="benefitType" className="inputField smallInputField">
                                <option value="percent_discount">% Discount</option>
                                <option value="amount_discount">Amount Discount</option>
                                <option value="ticket">Event Ticket</option>
                                <option value="free">Free Item</option>
                            </select>
                        </div>
                        <div className="inputGroup smallInputGroup">
                            <div className="inputLabel">% DISCOUNT APPLIED</div>
                            <input
                                className="inputField smallInputField"
                                type="number"
                                placeholder="% Discount"
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="inputGroup">
                        <div className="inputLabel">BUSINESS WALLET</div>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="asr230192ud8hqweqwrqfw982yr31r798qhw"
                            value={businessWallet}
                            onChange={(e) => setBusinessWallet(e.target.value)}
                        />
                    </div>
                    {/* <div className="inputGroup">
                        <div className="inputLabel">RENEWAL FREQUENCY</div>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="2 times, renews every month"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                        />
                    </div> */}
                    <button type="submit" className="button">
                        Create Benefit
                    </button>
                </form>
        </div>
    );
};
