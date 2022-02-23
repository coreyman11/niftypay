import React from 'react';
import logo from './logo.svg';
import './App.css';
import QR from './qr';
import { Wallet } from './wallet';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <QR /> */}
        <Wallet />
      </header>
    </div>
  );
}

export default App;
