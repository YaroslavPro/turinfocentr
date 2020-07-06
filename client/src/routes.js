import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ServicesPage } from './pages/ServicesPage';
//import { ServiceDetailPage } from './pages/ServiceDetailPage';

export const useRoutes = () => (
    <Switch>
        <Route path="/" exact>
            <ServicesPage />
        </Route>
        <Route path="/:id">
            <ServicesPage />
        </Route>
        <Redirect to="/" />
    </Switch>
);