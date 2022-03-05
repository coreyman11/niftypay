import React, { useEffect, useState } from 'react';
import {Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import {Idl, Program, Provider, web3} from '@project-serum/anchor';
import idl from '../niftypay.json';
import { WalletContext } from './walletProvider';
import { Wallet } from '../wallet';


const programID = new PublicKey(idl.metadata.address);
const network =  clusterApiUrl('devnet');
const opts: {preflightCommitment : web3.Commitment } = {
  preflightCommitment: 'processed'
}

export const AnchorContext = React.createContext({} as any);

const AnchorProvider = ({ children }: { children: any}) => {
    const { walletAddress } = React.useContext(WalletContext);
    const [provider, setProvider] = useState<Provider|null>(null);
    const [program, setProgram] = useState<Program|null>(null);
    useEffect(() => {
        const connection = new Connection(network, opts.preflightCommitment);
        const provider = new Provider(connection, window.solana, opts);
        const program = new Program(idl as Idl, programID, provider);
        setProvider(provider);
        setProgram(program);

    }, [walletAddress])
    if (!walletAddress) return <Wallet />
    return (
        <AnchorContext.Provider value={ { provider, program } }>
            {children}
        </AnchorContext.Provider>
    );
}

export default AnchorProvider;
