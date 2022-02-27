import { useState, useContext } from "react";
import { AnchorContext } from "../../provider/anchorProvider";
import { web3 } from '@project-serum/anchor';

export const BenefitForm = () => {
    const { program, provider } = useContext(AnchorContext);
    const [inputValue, setInputValue] = useState('');
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
        <div className="">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    createBenefit();
                }}
            >
                <input
                    type="text"
                    placeholder="Enter Benefit Name!"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="cta-button submit-gif-button">
                    Create Benefit
                </button>
            </form>
        </div>
    );
};
