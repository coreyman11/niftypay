import { useState } from "react";

export const Home = () => {
    return (
        <div className="homeContainer container">
            <div className="topArea">
                <div className="arrowArea"> {"<-"} </div>
                <div className="walletArea">7aht...2bf9</div>
            </div>
            <div className="header">Your Nifty Collections</div>
            <div className="subheader">You have no collections with Nifty Pay benefits... yet.</div>
            <div className="button"> Add a Collection</div>
        </div>
    );
};
