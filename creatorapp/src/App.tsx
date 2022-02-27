import React from 'react';
import './App.css';
import WalletProvider from './provider/walletProvider';
import AnchorProvider from './provider/anchorProvider';
import { Buffer } from 'buffer';
import {Router} from './router';
window.Buffer = Buffer;

function App() {
  return (
    <div className="App">
      <WalletProvider>
        <AnchorProvider>
         <Router/>
        </AnchorProvider>
      </WalletProvider>
    </div>
  );
}

export default App;
