import { useState } from "react";
import {
    Link,
  } from "react-router-dom";

export const Congrats = () => {
    return (
        <div className="homeContainer container">
            <div className="topArea">
                <div className="arrowArea"> &nbsp; </div>
                <div className="walletArea">7aht...2bf9</div>
            </div>
            <div className="header">Congrats! 🎉</div>
            <div className="subheader">Your Nifty benefits are now added to your collection.</div>
            <div className="subheader">Your merchants can now create QR codes for holders to access benefits.</div>
            <button className="button">
                <Link to="/" className="button">Go Back to Projects</Link>
            </button>
        </div>
    );
};
