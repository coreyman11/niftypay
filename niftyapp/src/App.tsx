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

const renderTab = (tab: Tab) => {
  switch (tab) {
    case Tab.Home:
      return <Home/>;
      break;
    case Tab.Benefits:
      return <Benefits />;
      break;
    case Tab.Scan:
      return <Scan />;
      break;
    case Tab.Pay:
      return <Pay />;
      break;
    case Tab.QR:
      return <QR />;
      break;
    default:
      return null;
      break;
  }
}

function App() {
  const [tab, setTab] = useState<Tab>(Tab.Scan);
  return (
    <div className="App">
      {renderTab(tab)}
    </div>
  );
}

export default App;
