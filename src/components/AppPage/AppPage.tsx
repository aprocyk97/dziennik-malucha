import React, { FC } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


import { FrontPage } from '../FrontPage/FrontPage';
import { AdPage } from './AdPage/AdPage';
import { MenuPage } from './MenuPage/MenuPage';
import { GalleryPage } from './GalleryPage/GalleryPage';
import { PresencePage } from './PresencePage/PresencePage';
import { ReceivablesPage } from './ReceivablesPage/ReceivablesPage';
import { RightNavBar } from './RightNavBar/RightNavBar';
import { SettingsPage } from './SettingsPage/SettingsPage';
import { ContactPage } from '../FrontPage/ContactPage/ContactPage';
import { MainPage } from './MainPage/MainPage';



const Wrapper = styled.div`
    display: flex;
`;

export const AppPage: FC = () => {

    return(
        <Router>
                <Wrapper>
                    <RightNavBar />
                    <Switch>
                        <Route exact path="/main">
                            <MainPage />
                        </Route>
                        <Route exact path="/receivables">
                            <ReceivablesPage />
                        </Route>
                        <Route exact path="/present">
                            <PresencePage />
                        </Route>
                        <Route exact path="/menu">
                            <MenuPage />
                        </Route>
                        <Route exact path="/ad">
                            <AdPage />
                        </Route>
                        <Route exact path="/gallery">
                            <GalleryPage />
                        </Route>
                        <Route exact path="/settings">
                            <SettingsPage />
                        </Route>
                        <Route exact path="/contact">
                            <ContactPage />
                        </Route>
                    </Switch>
                </Wrapper>
        </Router>
    );

};