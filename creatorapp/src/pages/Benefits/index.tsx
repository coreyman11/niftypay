import { useState, useContext, useEffect } from "react";
import { AnchorContext } from "../../provider/anchorProvider";
import {
    Link,
  } from "react-router-dom";

export const Benefits = ()  => {
    const { program } = useContext(AnchorContext);
    const [benefits, setBenefits] = useState([]);
    const getBenefitList = async () => {
        try {
            const benefits = await program.account.benefit.all();
            console.log("Got the benefits", benefits)
            setBenefits(benefits.map((p: { account: any; }) => p.account))

        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        getBenefitList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="connected-container">
            <Link className="button" to="new">Create Benefits</Link>
            <div className="gif-grid">
                {benefits.map(({ name }, id) => (
                    <div className="gif-item" key={id}>
                        {name}
                    </div>
                ))}
            </div>
        </div>
    );
};
