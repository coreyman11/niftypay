import { useState } from "react";
import '../App.css';
import { Nifty } from './nifty';

export const Home = () => {
  
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
