import { useState } from "react";
import '../App.css';
import { Tab } from "../types";
import { Nifty } from './nifty';

interface HomeProps {
  setTab: (tab: Tab) => void;
}

export const Home: React.FC<HomeProps> = () => {
  
  return (
    <div className="homeContainer container">
       <div className="top">
        <p>&nbsp; &nbsp; &nbsp;</p>
        <p className="header">Nifty</p>
        <img src="./qricon.png" height="20px" className="backArrow"></img>
      </div>
      <div className="content homeContent">
        <Nifty />
        <Nifty />
        <Nifty />
        <Nifty />
        <Nifty />
      </div>
    </div>
  );
};
