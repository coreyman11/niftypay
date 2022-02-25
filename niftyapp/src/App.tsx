import React from 'react';
import { useState } from "react";
import logo from './logo.svg';
import './App.css';
import QR from './components/qr';
import { Home } from './components/home';
import { Benefits } from './components/benefits';
import { Scan } from './components/scan';
import { Pay } from './components/pay';
import { Tab } from "./types";

const renderTab = (tab: Tab, setTab: (tab: Tab) => void) => {
  switch (tab) {
    case Tab.Home:
      return <Home setTab={setTab}/>;
      break;
    case Tab.Benefits:
      return <Benefits setTab={setTab}/>;
      break;
    case Tab.Scan:
      return <Scan setTab={setTab}/>;
      break;
    case Tab.Pay:
      return <Pay setTab={setTab}/>;
      break;
    default:
      return null;
      break;
  }
}

function App() {
  const [tab, setTab] = useState<Tab>(Tab.Home);
  return (
    <div className="App">
      {renderTab(tab, setTab)}
    </div>
  );
}

export default App;
