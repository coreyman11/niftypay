import React, { useLayoutEffect, useState } from 'react';
import './App.css';
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
      return <Home setTab={setTab} />;
    case Tab.Benefits:
      return <Benefits {...props} setTab={setTab} setProps={setProps} />;
    case Tab.Scan:
      return <Scan {...props} setTab={setTab} setProps={setProps} />;
    case Tab.Pay:
      return <Pay {...props} setTab={setTab} setProps={setProps} />;
    default:
      return null;
  }
}

function App() {
  const [tab, setTab] = useState<Tab>(Tab.Home);
  const [props, setProps] = useState<any>({});
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
      <div className="title">
        🦸‍♀️<br/>
        Unleash <br/>
        your NFT's <br/>
        <div className="highlight">&nbsp;superpowers&nbsp;</div>
      </div>
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
          {renderTab(tab, setTab, props, setProps)}
        </AnchorProvider>
      }
    </div>
  );
}

export default App;
