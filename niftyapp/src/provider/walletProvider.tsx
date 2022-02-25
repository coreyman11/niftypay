import React, { useState } from 'react';



export const WalletContext = React.createContext({} as any);

const WalletProvider = ({ children }: { children: any}) => {
    const [walletAddress, setWalletAddress] = useState(null);
    return (
        <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
            {children}
        </WalletContext.Provider>
    );
}

export default WalletProvider;
