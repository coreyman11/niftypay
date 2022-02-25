import React from 'react';
import { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Numpad } from './components/numpad';
import { QRCode } from './components/qrcode';
import { Tab } from "./types";

const renderTab = (tab: Tab, setTab: (tab: Tab) => void) => {
  switch (tab) {
    case Tab.Numpad:
      return <Numpad setTab={setTab}/>;
      break;
    case Tab.QRCode:
      return <QRCode setTab={setTab}/>;
      break;
    default:
      return null;
      break;
  }
}

function App() {
  const [tab, setTab] = useState<Tab>(Tab.Numpad);
  return (
    <div className="App">
      {renderTab(tab, setTab)}
    </div>
  );
}

export default App;
