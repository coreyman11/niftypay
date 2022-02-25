import React from 'react';
import { useState } from "react";
import './App.css';
import { Router } from './router';
import WalletProvider from './provider/walletProvider';
import AnchorProvider from './provider/anchorProvider';
import { Buffer } from 'buffer';
import { Home } from './components/home';
import { Benefits } from './components/benefits';
import { Scan } from './components/scan';
import { Pay } from './components/pay';
import { Tab } from "./types";
window.Buffer = Buffer;

const renderTab = (tab: Tab, setTab: (tab: Tab) => void) => {
  switch (tab) {
    case Tab.Home:
      return <Home setTab={setTab}/>;
    case Tab.Benefits:
      return <Benefits setTab={setTab}/>;
    case Tab.Scan:
      return <Scan setTab={setTab}/>;
    case Tab.Pay:
      return <Pay setTab={setTab}/>;
    default:
      return null;
  }
}

function App() {
  const [tab, setTab] = useState<Tab>(Tab.Home);
  return (
    <div className="App">
      {/* {renderTab(tab, setTab)} */}
      <WalletProvider>
        <AnchorProvider>
          <Router />
        </AnchorProvider>
      </WalletProvider>
    </div>
  );
}

export default App;
