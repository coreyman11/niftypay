import { useState, useContext } from "react";
import { AnchorContext } from "../../provider/anchorProvider";
import { web3 } from '@project-serum/anchor';
import {
    Link,
  } from "react-router-dom";


export const BenefitForm = () => {
    const { program, provider } = useContext(AnchorContext);
    const [benefitName, setBenefitName] = useState('');
    const [benefitType, setBenefitType] = useState('');
    const [discount, setDiscount] = useState('');
    const [frequency, setFrequency] = useState('');
    const createBenefit = async () => {
        try {
            const project = web3.Keypair.generate();

            const benefit = web3.Keypair.generate();
            const business_owner = web3.Keypair.generate();

            await program.rpc.createBenefit(
                project.publicKey, 
                "Cozy Cafe 20%", //name
                { freebie: {} }, //benefitType
                { oneTime: {} }, // frequency
                2, //allowed usage
                20, //discount %
                business_owner.publicKey, {
                accounts: {
                    benefit: benefit.publicKey,
                    creator: provider.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId,
                },
                signers: [benefit],
            });

        } catch (error) {
            console.log("error", error);
        }
    }
    
    return (
        <div className="addProjectContainer container connected-container">
            <div className="topArea">
                <div className="arrowArea"><Link className="arrowLink" to="/">{"<-"}</Link> </div>
                <div className="walletArea">7aht...2bf9</div>
            </div>
            <div className="header">Add Benefits to this Collection</div>
            <div className="subheader">What benefits do you want this NFT collection to give to holders?</div>
            <div className="formContainer">
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
                            placeholder="Starbucks and Mycoverse NFT 20% Discount"
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
                                type="text"
                                placeholder="% Discount"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="inputGroup">
                        <div className="inputLabel">RENEWAL FREQUENCY</div>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="2 times, renews every month"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button">
                        <Link to="/congrats" className="button">Create Benefit</Link>
                    </button>
                </form>
            </div>
        </div>
    );
};
