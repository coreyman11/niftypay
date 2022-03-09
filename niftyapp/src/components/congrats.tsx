import '../App.css';
import { useState, useContext, useEffect } from "react";
import { Tab } from "../types";

interface CongratsProps {
  setTab: (tab: Tab) => void;
  setProps: (props: any) => void;
}

export const Congrats: React.FC<CongratsProps> = (props) => {

  useEffect(() => {
    console.log("Congrats!");
  }, [])

  const goHome = async () => {
    props.setTab(Tab.Home)
  }

  return (
    <div className="congratsContainer container">
        <div className="top">
          <p>&nbsp; &nbsp; &nbsp;</p>
          <p className="header">Congrats! 🎉</p>
          <p>&nbsp; &nbsp; &nbsp;</p>
        </div>
        <div className="content">
          <div className="subheader">You've sent your payment. Enjoy!</div>
          <div className="button" onClick={() => goHome()}>Go Home</div>
        </div>
    </div>
  );
};
