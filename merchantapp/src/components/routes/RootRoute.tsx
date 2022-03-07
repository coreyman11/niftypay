import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import React, { FC, useEffect, useMemo } from 'react';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import { ConfigProvider } from '../contexts/ConfigProvider';
import { PaymentProvider } from '../contexts/PaymentProvider';
import { ThemeProvider } from '../contexts/ThemeProvider';
import { TransactionsProvider } from '../contexts/TransactionsProvider';
import { SolanaPayLogo } from '../images/SolanaPayLogo';
import { USDCIcon } from '../images/USDCIcon';
import { DEVNET_ENDPOINT } from '../../utils/constants';
import * as css from './RootRoute.module.pcss';

const Redirect = () => {
    const { publicKey } = useWallet();
    console.log(publicKey);
    const navigate = useNavigate();
    useEffect(() => {
        if (!publicKey) return;
        navigate({
            pathname: '/new',
            search: `?recipient=${publicKey}&splToken=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&label=My Store`
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicKey?.toBase58()]);
    return <></>
}
export const RootRoute: FC = () => {
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
    const [params] = useSearchParams();
    const { recipient, label, splToken } = useMemo(() => {
        let recipient: PublicKey | undefined, label: string | undefined;
        let splToken: string  | undefined;
        const recipientParam = params.get('recipient');
        const labelParam = params.get('label');
        const splTokenParam = params.get('splToken');
        if (recipientParam && labelParam && splTokenParam) {
            try {
                recipient = new PublicKey(recipientParam);
                label = labelParam;
                splToken = splTokenParam as string;
            } catch (error) {
                console.error(error);
            }
        }

        return { recipient, label, splToken };
    }, [params]);

    return (
        <ThemeProvider>
            <ConnectionProvider endpoint={DEVNET_ENDPOINT}>
                <WalletProvider wallets={wallets} autoConnect >
                    <WalletModalProvider>
                        {recipient && label && splToken ? 
                                <ConfigProvider
                                    recipient={recipient}
                                    label={label}
                                    symbol="USDC"
                                    icon={<USDCIcon />}
                                    splToken={new PublicKey(splToken as string)}
                                    decimals={9}
                                    minDecimals={1}
                                    requiredConfirmations={9}
                                >
                                    <TransactionsProvider>
                                        <PaymentProvider>
                                            <Outlet />
                                        </PaymentProvider>
                                    </TransactionsProvider>
                                </ConfigProvider>
                            : (
                                <div className={css.home}>
                                    <WalletMultiButton />
                                    <Redirect/>
                                    <div className={css.logo}>
                                        <SolanaPayLogo />
                                    </div>
                                </div>
                        )
                        }
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </ThemeProvider>
    );
};
