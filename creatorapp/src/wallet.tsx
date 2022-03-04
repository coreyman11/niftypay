import React, { useLayoutEffect, useContext } from 'react';
import { WalletContext } from './provider/walletProvider';

export const Wallet = () => {
  const { walletAddress, setWalletAddress } = useContext(WalletContext);
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
  const renderNotConnectedContainer = () => (<button
    className="button"
    onClick={connectWallet}
  >
    Connect to Wallet
  </button>)
  return (
    <div className="App">
      <div className="container">
        {!walletAddress && renderNotConnectedContainer()}
        {walletAddress && <p>{walletAddress}</p>}
      </div>
    </div>
  );
};
