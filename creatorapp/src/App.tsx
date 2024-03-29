import React, { useState, useLayoutEffect } from 'react';
import './App.css';
import AnchorProvider from './provider/anchorProvider';
import { Buffer } from 'buffer';
import { Router } from './router';
window.Buffer = Buffer;

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        console.log("Phantom wallet found!")
        const response = await solana.connect();
        console.log('Connected with ', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      } else {
        alert('Solana object not found. Get a wallet');
      }
    } catch (error) {
      console.error(error)
    }
  }
  useLayoutEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    }
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with ', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  }
  const renderNotConnectedContainer = () => (
    <div className="walletConnect">
      <div className="header">⏰</div>
      <div className="header">It's time to <div className="highlight">LEVEL UP</div>your NFTs...</div>
      <button
        className="button"
        onClick={connectWallet}
      >
        Connect to Wallet
      </button>
    </div>)
  return (
    <div className="App">
      {!walletAddress && renderNotConnectedContainer()}
      {walletAddress &&
        <AnchorProvider>
          <Router />
        </AnchorProvider>
      }
    </div>
  );
}

export default App;

