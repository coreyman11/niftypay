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
import { SOLIcon } from '../images/SOLIcon';
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
            search: `?recipient=${publicKey}&label=My Store`
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicKey]);
    return <></>
}
export const RootRoute: FC = () => {
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
    const [params] = useSearchParams();
    const { recipient, label } = useMemo(() => {
        let recipient: PublicKey | undefined, label: string | undefined;

        const recipientParam = params.get('recipient');
        const labelParam = params.get('label');
        if (recipientParam && labelParam) {
            try {
                recipient = new PublicKey(recipientParam);
                label = labelParam;
            } catch (error) {
                console.error(error);
            }
        }

        return { recipient, label };
    }, [params]);

    return (
        <ThemeProvider>
            <ConnectionProvider endpoint={DEVNET_ENDPOINT}>
                <WalletProvider wallets={wallets} autoConnect >
                    <WalletModalProvider>
                        {recipient && label ? 
                                <ConfigProvider
                                    recipient={recipient}
                                    label={label}
                                    symbol="SOL"
                                    icon={<SOLIcon />}
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
