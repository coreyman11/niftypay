import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectForm } from './pages/Projects/form';
import { BenefitForm } from './pages/Benefits/form';
import { Benefits } from './pages/Benefits';
import { Congrats } from './pages/Home/congrats';


export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Projects />} />
                <Route path="new" >
                    <Route index 
                        element={<ProjectForm/>} />
                </Route>
                <Route path=":projectId">
                        <Route
                            path="new"
                            element={<BenefitForm />}
                        />
                </Route>
                <Route path="congrats" element={<Congrats />} />
                
                {/* <Route path=":projectId">
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
                </Route> */}
            </Routes>
        </BrowserRouter>
    );
}