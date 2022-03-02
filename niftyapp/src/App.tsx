import React from 'react';
import { useState } from "react";
import './App.css';
import WalletProvider from './provider/walletProvider';
import AnchorProvider from './provider/anchorProvider';
import { Buffer } from 'buffer';
import { Home } from './components/home';
import { Benefits } from './components/benefits';
import { Scan } from './components/scan';
import { Pay } from './components/pay';
import { Tab } from "./types";
window.Buffer = Buffer;

const renderTab = (tab: Tab, setTab: (tab: Tab) => void, props: any, setProps: (props: any) => void) => {
  switch (tab) {
    case Tab.Home:
      return <Home setTab={setTab}/>;
    case Tab.Benefits:
      return <Benefits {...props} setTab={setTab} setProps={setProps} />;
    case Tab.Scan:
      return <Scan {...props} setTab={setTab} setProps={setProps}/>;
    case Tab.Pay:
      return <Pay {...props }setTab={setTab} setProps={setProps} />;
    default:
      return null;
  }
}

function App() {
  const [tab, setTab] = useState<Tab>(Tab.Home);
  const [props, setProps] = useState<any>({});
  return (
    <div className="App">
      <WalletProvider>
        <AnchorProvider>
          {renderTab(tab, setTab, props, setProps)}
        </AnchorProvider>
      </WalletProvider>
    </div>
  );
}

export default App;
