import { useState, useContext } from "react";
import { AnchorContext } from "../../provider/anchorProvider";

export const Home = () => {
    const { program, provider } = useContext(AnchorContext);
    return (
        <div className="homeContainer container">
            <div className="topArea">
                <div className="arrowArea"> {"<-"} </div>
                <div className="walletArea">{provider.wallet.publicKey.toBase58().slice(0,4).concat('...',provider.wallet.publicKey.toBase58().slice(provider.wallet.publicKey.toBase58().length-4,provider.wallet.publicKey.toBase58().length))}</div>
            </div>
            <div className="header">Your Nifty Collections</div>
            <div className="subheader">You have no collections with Nifty Pay benefits... yet.</div>
            <div className="button"> Add a Collection</div>
        </div>
    );
};
