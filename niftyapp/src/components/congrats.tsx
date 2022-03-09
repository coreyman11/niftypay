import '../App.css';
import { useState, useContext, useEffect } from "react";
import {
  Link,
} from "react-router-dom";

interface CongratsProps {
 
}

export const Congrats: React.FC<CongratsProps> = (props) => {

  useEffect(() => {
    console.log("Congrats!");
  }, [])

  return (
    <div className="homeContainer container">
            <div className="topArea">
                <div className="arrowArea"> &nbsp; </div>
                <div className="walletArea">7aht...2bf9</div>
            </div>
            <div className="header">Congrats! 🎉</div>
            <div className="subheader">Your Nifty benefits are now added to your collection.</div>
            <div className="subheader">Your can now create QR codes for holders to access benefits.</div>
            <Link to="/" className="button">Go Back to Projects</Link>
        </div>
  );
};
