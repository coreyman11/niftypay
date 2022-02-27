import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectForm } from './pages/Projects/form';
import { Wallet } from './wallet';
import { WalletContext } from './provider/walletProvider';
import { BenefitForm } from './pages/Benefits/form';
import { Benefits } from './pages/Benefits';


export function Router() {
    const { walletAddress } = React.useContext(WalletContext);
    if (!walletAddress) return <Wallet />
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="projects" >
                    <Route
                        index
                        element={<Projects />}
                    />
                    <Route path="new" element={<ProjectForm />} />
                    <Route path=":projectId">
                        <Route
                            index
                            element={<ProjectForm />}
                        />
                        <Route path="benefits">
                            <Route
                                index
                                element={<Benefits />}
                            />
                            <Route
                                path="new"
                                element={<BenefitForm />}
                            />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}